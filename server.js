var http = require('http');
var server = http.Server();
var LevelDbWriteStream = require('./leveldbwritestream.js');
var LevelDbReadStream = require('./leveldbreadstream.js');

var levelup = require('levelup');
var db = levelup('./mydb');

var log = console.log.bind(console);
var error = console.log.bind(console, 'ERROR');
var debug = console.log.bind(console, 'DEBUG');

server.on('clientError', function (exception, socket) {
  console.log('clientError occured ', exception);
});

server.on('close', function () {
  console.log('Closing http server');
});

server.on('request', function (req, res) {
  log(req.url, req.method);
  debug(req.headers);

  var key = req.url.substr(1);
  if (key === '') {
    res.end('Key is missing, URL should include a key');
    return;
  }

  if (req.method === 'POST') {
    var ws = new LevelDbWriteStream(null, db, key);
    req.pipe(ws);

    ws.on('finish', function () {
      res.end();
    });

    ws.on('error', function (err) {
      error(err);
    });
  }

  if (req.method === 'GET') {
    var rs = new LevelDbReadStream(null, db, key);

    rs.on('error', function (err) {
      error(err);
      res.end('' + err);
    });

    rs.pipe(res);
  }


});

process.on('SIGINT', function () {
  console.log("Caught interrupt signal");
  db.close();
  server.close();
  setTimeout(process.exit, 1000);
});

process.on('exit', function (code) {
  console.log('About to exit with code:', code);
});

var port = 3000;
server.listen(port);
console.log('listening on port', port);
