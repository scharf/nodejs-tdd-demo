
var assert = require('assert');
var createDatabase = require('../database');

require('./github-mock')();

describe('database', function () {
  describe('readDevelopers', function () {
    var database = createDatabase();
    it('should return developers', function (done) {
      database.readDevelopers('Heidelberg', function (err, developers) {
        assert.ok(developers);
        var expectedDevelopers = require('./expected-developers');
        assert.deepEqual(developers, expectedDevelopers);
        done();
      });
    });
  });
});