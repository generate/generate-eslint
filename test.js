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
    app = generate({silent: true});
    app.cwd = cwd();
    app.option('dest', cwd());
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

    it('should extend tasks onto the instance', function() {
      app.use(generator);
      assert(app.tasks.hasOwnProperty('default'));
      assert(app.tasks.hasOwnProperty('eslintrc'));
      assert(app.tasks.hasOwnProperty('ignore'));
    });

    it('should run the `default` task', function(cb) {
      app.use(generator);
      app.generate('default', exists('.eslintrc.json', cb));
    });

    it('should run the `ignore` task', function(cb) {
      app.use(generator);
      app.generate('ignore', exists('.eslintignore', cb));
    });

    it('should run the `eslintignore` (alias) task', function(cb) {
      app.use(generator);
      app.generate('eslintignore', exists('.eslintignore', cb));
    });
  });

  describe('generator', function() {
    it('should work as a generator', function(cb) {
      app.register('eslint', generator);
      app.generate('eslint', exists('.eslintrc.json', cb));
    });

    it('should run the `default` task', function(cb) {
      app.register('eslint', generator);
      app.generate('eslint:default', exists('.eslintrc.json', cb));
    });

    it('should run the `eslint` task', function(cb) {
      app.register('eslint', generator);
      app.generate('eslint:eslintrc', exists('.eslintrc.json', cb));
    });

    it('should run the `ignore` task', function(cb) {
      app.register('eslint', generator);
      app.generate('eslint:ignore', exists('.eslintignore', cb));
    });

    it('should run the `eslintignore` (alias) task', function(cb) {
      app.register('eslint', generator);
      app.generate('eslint:eslintignore', exists('.eslintignore', cb));
    });
  });

  describe('sub-generator', function() {
    it('should work as a sub-generator', function(cb) {
      app.register('foo', function(foo) {
        foo.register('eslint', generator);
      });
      app.generate('foo.eslint', exists('.eslintrc.json', cb));
    });

    it('should run the `default` task', function(cb) {
      app.register('foo', function(foo) {
        foo.register('eslint', generator);
      });
      app.generate('foo.eslint:default', exists('.eslintrc.json', cb));
    });

    it('should run the `ignore` task', function(cb) {
      app.register('foo', function(foo) {
        foo.register('eslint', generator);
      });
      app.generate('foo.eslint:ignore', exists('.eslintignore', cb));
    });

    it('should run the `eslintignore` (alias) task', function(cb) {
      app.register('foo', function(foo) {
        foo.register('eslint', generator);
      });
      app.generate('foo.eslint:eslintignore', exists('.eslintignore', cb));
    });
  });
});
