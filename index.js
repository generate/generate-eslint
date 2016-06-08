'use strict';

var path = require('path');
var dir = path.resolve.bind(path, __dirname, 'templates');

module.exports = function(app) {

  /**
   * Generate a `.eslintrc.json` file to the current working directory or
   * specified `--dest` directory.
   *
   * ```sh
   * $ gen eslint
   * ```
   * @name eslint
   * @api public
   */

  app.task('eslint', function() {
    return app.src(dir('eslintrc.json'))
      .pipe(app.dest(function(file) {
        file.basename = '.eslintrc.json';
        return app.cwd;
      }));
  });

  /**
   * Generate a `.eslintignore` file to the current working directory or
   * specified `--dest` directory. This task is also aliased as `eslintignore`,
   * in case you want to use this generator as a sub-generator or plugin and want
   * to use the `ignore` task name for something else.
   *
   * ```sh
   * $ gen eslint:ignore
   * ```
   * @name ignore
   * @api public
   */

  app.task('ignore', ['eslintignore']);
  app.task('eslintignore', function() {
    return app.src(dir('eslintrc.json'))
      .pipe(app.dest(function(file) {
        file.basename = '.eslintrc.json';
        return app.cwd;
      }));
  });

  /**
   * Alias for the [eslint][] task.
   *
   * ```sh
   * $ gen eslint:default
   * ```
   * @name eslint:default
   * @api public
   */

  app.task('default', {silent: true}, ['eslint']);
};
