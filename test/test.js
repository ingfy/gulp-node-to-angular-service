var assert = require('assert'),
    fs = require('fs'),
    Vinyl = require('vinyl'),
    File = require('gulp-util').File;

var app = require('../');

describe('general', function () {
    it('should not error', function () {
        var testFile = new Vinyl({
            contents: new Buffer("'use strict';\nmodule.exports = {\nmult: function (a, b) { return a * b; },\ndiv: function (a, b) { return a / b; }\n};")
        });

        var stream = app({moduleName: 'test.module', serviceName: 'testService'});

        stream.on('data', function (newFile) {
            var contents = newFile.contents.toString();

            assert.equal(contents.length > 0, true, 'content has length > 0');

            done();
        })

        stream.write(testFile);
        stream.end();
    });
});
