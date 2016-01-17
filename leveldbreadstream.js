var util = require('util');
var Readable = require('stream').Readable;

var debug = console.log.bind(console, 'DEBUG');

LevelDbReadStream = function (options, db, key) {
  var self = this;
  Readable.call(this, options);

  self.readCalled = false;
  self.buffer = '';

  db.get(key, function (err, value) {
    if (err) {
      self.emit('error', err);
      return;
    }

    if (self.readCalled) {
      self.push(value);
      self.push(null);
    } else {
      self.buffer = value;
    }
  });

  this.on('finish', function () {
    debug('finish in readable');
  });

};
util.inherits(LevelDbReadStream, Readable);

LevelDbReadStream.prototype._read = function () {
  this.readCalled = true;
  if (this.buffer.length) {
    this.push(this.buffer);
    this.push(null);
  }
};

module.exports = LevelDbReadStream;
