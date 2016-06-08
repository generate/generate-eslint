'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var generate = require('generate');
var del = require('delete');
var generator = require('./');
var app;

var cwd = path.resolve.bind(path, __dirname, 'actual');

function exists(name, cb) {
  var filepath = cwd(name);

  return function(err) {
    if (err) return cb(err);

    fs.stat(filepath, function(err, stat) {
      assert(stat);
      del(path.dirname(filepath), cb);
    });
  }
}

describe('generate-eslint', function() {
  beforeEach(function() {
    app = generate({cli: true, silent: true});
    app.cwd = cwd();
    app.option('dest', cwd());
    app.data('author.name', 'Jon Schlinkert');
  });

  describe('plugin', function() {
    it('should only register the plugin once', function(cb) {
      var count = 0;
      app.on('plugin', function(name) {
        if (name === 'generate-eslint') {
          count++;
        }
      });
      app.use(generator);
      app.use(generator);
      app.use(generator);
      assert.equal(count, 1);
      cb();
    });
  });

  describe('generator', function() {
    it('should work as a plugin', function() {
      app.use(generator);
      assert(app.tasks.hasOwnProperty('default'));
      assert(app.tasks.hasOwnProperty('eslint'));
      assert(app.tasks.hasOwnProperty('ignore'));
    });

    it('should work as a generator', function(cb) {
      app.register('eslint', generator);
      app.generate('eslint', exists('.eslintrc.json', cb));
    });

    it('should run the `default` task', function(cb) {
      app.register('eslint', generator);
      app.generate('eslint:default', exists('.eslintrc.json', cb));
    });

    it('should run the `first-commit` task', function(cb) {
      app.register('eslint', generator);
      app.generate('eslint:first-commit', exists('.eslintrc.json', cb));
    });
  });
});
