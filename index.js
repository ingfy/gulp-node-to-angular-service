'use strict';

var through = require('through2'),
    node2angular = require('node-to-angular-service'),
    PluginError = require('gulp-util').PluginError;

module.exports = function (opt) {
    return through.obj(function gulpNode2Angular(file, encoding, callback) {
        if (file.isNull()) return callback(null, false);

        if (file.isStream()) return callback(new PluginError('gulp-node-to-angular-service', 'streaming not supported'));

        opt.contents = String(file.contents);
        opt.encoding = encoding;

        node2angular(opt, function (err, result) {
            if (err) callback(err);

            file.contents = new Buffer(result);

            callback(null, file);
        });
    });
}
