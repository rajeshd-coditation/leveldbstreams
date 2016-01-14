var util = require('util');
var Writable = require('stream').Writable;
var levelup = require('levelup');

LevelDbWriteStream = function (options, dbname, key) {
  var self = this;

  if (!key) throw 'The key argument is mandatory';
  Writable.call(this, options);

  self.buffer = '';

  self.on('finish', function () {
    var db = levelup(dbname);
    db.put(key, self.buffer, function (err) {
      if (err) self.emit('error', 'LevelDbWriteStream: error in saving to db', err);
      db.close();
    });
  });

};
util.inherits(LevelDbWriteStream, Writable);


LevelDbWriteStream.prototype._write = function (chunk, enc, next) {
  this.buffer += chunk;
  next();
};

module.exports = LevelDbWriteStream;