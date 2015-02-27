
var request = require('superagent');

module.exports = createDatabase;

function createDatabase() {
  return  {
    readDevelopers: readDevelopers
  };

  function readDevelopers(location, cb) {
    request
      .get('https://api.github.com/search/users?q=location%3A' + location)
      .end(function (err, res) {
        var developers = res.body.items;
        var usernames = developers.map(function (each) {
          return each.login;
        });
        cb(null, usernames);
      });
  }
}
