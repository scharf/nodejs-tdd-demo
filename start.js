
var createServer = require('./server');
var createDatabase = require('./database');
var server = createServer();
require('./test/github-mock')();
server.database = createDatabase();
server.listen(2000, function () {
  console.log('running');
});