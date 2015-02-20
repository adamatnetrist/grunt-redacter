/**
 * Created by areiter on 2/19/15.
 */

'use strict';

module.exports = function (grunt) {

  var chalk = require('chalk');

  grunt.registerMultiTask('redacter', 'Removes marked sections of files.', function () {
    var options = this.options({
      js: {
        start: '//+r',
        end: '//-r'
      },
      html: {
        start: '<!-- +r -->',
        end: '<!-- -r -->'
      }
    });

    this.files.forEach(function (f) {

      var charCount = 0;

      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        var i1, i2, start, end, src = grunt.file.read(filepath);

        if (filepath.indexOf('.js') === filepath.length - '.js'.length) {
          start = options.js.start;
          end = options.js.end;
        } else if (filepath.indexOf('.html') === filepath.length - '.html'.length) {
          start = options.html.start;
          end = options.html.end;
        }

        if (start && end) {
          while (src.indexOf(start) !== -1) {
            i1 = src.indexOf(start);
            i2 = src.indexOf(end, i1) + end.length;
            if (i2 !== -1) {
              charCount += src.substring(i1, i2).length;
              src = src.replace(src.substring(i1, i2), '');
            } else {
              grunt.fail.fatal('Unmatched redacter tokens in %s!', filepath);
            }
          }
        } else {
          grunt.log.warn('File ' + chalk.cyan(filepath) + ' not a redactable type!');
        }

        return src;
      });

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('Redacted ' + chalk.cyan(f.dest) + ': ' + charCount + ' characters purged.');
    });
  });
};