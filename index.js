
var through = require('through2'),
  gutil = require('gulp-util'),
  Rollup = require('rollup');

var PluginError = gutil.PluginError;

module.exports = function(options) {

  var stream = through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      return callback();
    }

    var filePath = file.path;
    options.entry = filePath;

    return Rollup.rollup(options).then(function (bundle) {
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

      callback(null, file);
    }).catch(function (err) {
      callback(new PluginError('gulp-rollup-mep', err));
    });
  });

  return stream;
};
