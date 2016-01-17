var util = require('util');
var Writable = require('stream').Writable;

LevelDbWriteStream = function (options, db, key) {
  var self = this;

  if (!key) throw 'The key argument is mandatory';
  Writable.call(this, options);

  self.buffer = '';

  self.on('finish', function () {
    db.put(key, self.buffer, function (err) {
      if (err) self.emit('error', 'LevelDbWriteStream: error in saving to db', err);
    });
  });

};
util.inherits(LevelDbWriteStream, Writable);

LevelDbWriteStream.prototype._write = function (chunk, enc, next) {
  this.buffer += chunk;
  next();
};

module.exports = LevelDbWriteStream;