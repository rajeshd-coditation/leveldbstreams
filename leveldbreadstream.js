var util = require('util');
var Readable = require('stream').Readable;
var levelup = require('levelup');

var debug = console.log.bind(console, 'DEBUG');

LevelDbReadStream = function (options, dbname, key) {
  var self = this;
  Readable.call(this, options);

  self.readCalled = false;
  self.buffer = '';

  var db = levelup(dbname);
  db.get(key, function (err, value) {
    if (err) {
      db.close();
      self.emit('error', err);
      return;
    }

    if (self.readCalled) {
      self.push(value);
      self.push(null);
    } else {
      self.buffer = value;
    }
    db.close();
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
