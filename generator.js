'use strict';

var path = require('path');
var templates = path.join(__dirname, 'templates');
var isValid = require('is-valid-app');

module.exports = function(app) {
  if (!isValid(app, 'generate-eslint')) return;

  /**
   * Generate a `.eslintrc.json` file to the current working directory.
   *
   * ```sh
   * $ gen eslint
   * ```
   * @name eslint
   * @api public
   */

  app.task('eslint', {silent: true}, function() {
    return app.src('_eslintrc.json', {cwd: templates})
      .pipe(app.dest(function(file) {
        file.basename = '.eslintrc.json';
        return app.cwd;
      }));
  });

  /**
   * Generate a `.eslintignore` file to the current working directory. This task is also aliased as `eslintignore`, in case you want to use this generator as a sub-generator or plugin and want to use the `ignore` task name for something else.
   *
   * ```sh
   * $ gen eslint:ignore
   * ```
   * @name eslint:ignore
   * @api public
   */

  app.task('ignore', {silent: true}, ['eslintignore']);
  app.task('eslintignore', {silent: true}, function() {
    return app.src('_eslintignore', {cwd: templates})
      .pipe(app.dest(function(file) {
        file.basename = '.eslintignore';
        return app.cwd;
      }));
  });

  /**
   * Alias for the [eslint](#eslint) task.
   *
   * ```sh
   * $ gen eslint:default
   * ```
   * @name eslint:default
   * @api public
   */

  app.task('default', {silent: true}, ['eslint']);
};
