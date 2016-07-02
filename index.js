'use strict';

var Transform = require('readable-stream/transform'),
  Rollup = require('rollup');

module.exports = function(options) {

  var transformStream = new Transform({objectMode: true});
  transformStream._transform = function(file, encoding, callback) {
    if (file.isNull()) {
      return callback();
    }

    var filePath = file.path;

    return Rollup.rollup({
      entry: filePath
    }).then(function (bundle) {
      var proccessed = bundle.generate(options);
      file.contents = new Buffer(proccessed.code);
      if (options.sourceMap) {
        var map = proccessed.map;
        if (map) {
          map.file = file.relative;
          map.sources = map.sources.map(function(fileName) {
            return fileName;
          });
          file.sourceMap = map;
        }
      }
      
      return callback(null, file);
    });
  };

  return transformStream;
};
