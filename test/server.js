
var request = require('superagent');
var assert = require('assert');
var createServer = require('../server');

describe('server', function () {
  var server;
  before(function (done) {
    server = createServer();
    server.listen(2000, done);
  });

  describe('GET /developers', function () {
    it('should respond with developers', function (done) {
      var expectedDevelopers = [
        'lisa',
        'andi',
        'alex'
      ];
      var database = {
        readDevelopers: function (location, cb) {
          cb(null, expectedDevelopers);
        }
      };
      server.database = database;
      request
        .get('localhost:2000/developers?location=Heidelberg')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          
          assert.deepEqual(res.body, expectedDevelopers);
          done();
        });
    })
  });

  describe('GET /developers/:username', function () {
    it('should respond with a particular developer', function (done) {
      var developer = {
        username: 'lisa',
        name: 'Lisa Fischer'
      };
      var database = {
        readDeveloper: function (username, cb) {
          cb(null, developer);
        }
      };
      server.database = database;
      request
        .get('localhost:2000/developers/lisa')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, developer);
          done();
        });
    })
  });
});