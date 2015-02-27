
var nock = require('nock');

module.exports = createMocks;

function createMocks() {
  var github = nock('https://api.github.com');

  github
    .get('/search/users?q=location%3AHeidelberg')
    .reply(200, require('./heidelberg'));

  github
    .get('/users/alappe')
    .reply(200, require('./alappe'));
}
