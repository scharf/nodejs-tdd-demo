
var restify = require('restify');

module.exports = createServer;

function createServer() {
  var server = restify.createServer();
  server.use(restify.queryParser());
  server.on('uncaughtException', function (err) {
    throw err;
  });
  server.get('/developers', getDevelopers);
  server.get('/developers/:username', getDeveloper);

  function getDevelopers(req, res) {
    var location = req.params.location;
    server.database.readDevelopers(location, function (err, developers) {
      res.send(200, developers);
    });
  }

  function getDeveloper(req, res) {
    var username = req.params.username;
    server.database.readDeveloper(username, function (err, developer) {
      res.send(200, developer);
    });
  }

  return server;  
}
