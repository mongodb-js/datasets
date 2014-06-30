var debug = require('debug')('dataset:index');
var Inserter = require('./inserter');
var util = require('./dbUtil');
var argv = require('minimist')(process.argv.slice(2));

console.log(argv);

main(argv, function () {
  console.log('done');
});

// assume these are the user input
function main (opts, fn) {
  var user = util.parseInput(opts);
  util.readSchema(user, function(schema, dataStream) {
    util.connect(user, function(collection, db) {
      var inserter = new Inserter(collection, dataStream, function() {
        fn();
        db.close();
      });
      inserter.start();
    });
  });
}

module.exports = main;
