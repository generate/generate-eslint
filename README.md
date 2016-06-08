# generate-eslint [![NPM version](https://img.shields.io/npm/v/generate-eslint.svg?style=flat)](https://www.npmjs.com/package/generate-eslint) [![NPM downloads](https://img.shields.io/npm/dm/generate-eslint.svg?style=flat)](https://npmjs.org/package/generate-eslint) [![Build Status](https://img.shields.io/travis/generate/generate-eslint.svg?style=flat)](https://travis-ci.org/generate/generate-eslint)

Generate an eslint config file. Can be used as a sub-generator or plugin with other generators.

## What is generate?

Generate is a new, open source developer framework for rapidly initializing and scaffolding out new code projects, offering an intuitive CLI, and a powerful and expressive API that makes it easy and enjoyable to use.

Visit the [getting started guide](https://github.com/generate/getting-started-guide) or the [generate](https://github.com/generate/generate) project and documentation to learn more.

## Quickstart

generate-eslint is a [node.js](https://nodejs.org/en/) application that is installed using [npm](https://www.npmjs.com/). If you're unfamiliar with generate, it might help to visit the [generate](https://github.com/generate/generate) readme, or visit the [getting started guide](https://github.com/generate/getting-started-guide) before continuing on.

**Usage**

* [CLI usage](#cli)
* [API usage](#api)

***

### CLI

**Installing the CLI**

To run the `eslint` generator from the command line, you'll need to install [generate](https://github.com/generate/generate) globally first. You can do that now with the following command:

```sh
$ npm i -g generate
```

This adds the `gen` command to your system path, allowing it to be run from any directory.

**Help**

Get general help and a menu of available commands:

```sh
$ gen help
```

**Running the `eslint` generator**

Once both [generate](https://github.com/generate/generate) and `generate-eslint` are installed globally, you can run the generator with the following command:

```sh
$ gen eslint
```

If completed successfully, you should see both `starting` and `finished` events in the terminal, like the following:

```sh
[00:44:21] starting ...
...
[00:44:22] finished ✔
```

If you do not see one or both of those events, please [let us know about it](../../issues).

### Tasks

***

### API

**Use as a plugin in your generator**

Use as a plugin if you want to extend your own generator with the features, settings and tasks of generate-eslint, as if they were created on your generator.

In your `generator.js`:

```js
module.exports = function(app) {
  app.use(require('generate-eslint'));

  // specify any tasks from generate-eslint. Example:
  app.task('default', ['eslint']);
};
```

**Use as a sub-generator**

Use as a sub-generator if you want expose the features, settings and tasks from generate-eslint on a _namespace_ in your generator.

In your `generator.js`:

```js
module.exports = function(app) {
  // register the generate-eslint generator (as a sub-generator with an arbitrary name)
  app.register('foo', require('generate-eslint'));

  app.task('minify', function(cb) {
    // minify some stuff
    cb();
  });

  // run the "default" task on generate-eslint (aliased as `foo`), 
  // then run the `minify` task defined in our generator
  app.task('default', function(cb) {
    app.generate(['foo:default', 'minify'], cb);
  });
};
```

Tasks from `generate-eslint` will be available on the `foo` namespace from the API and the command line. Continuing with the previous code example, to run the `default` task on `generate-eslint`, you would run `gen foo:default` (or just `gen foo` if `foo` does not conflict with an existing task on your generator).

To learn more about namespaces and sub-generators, and how they work, [visit the getting started guide](https://github.com/generate/getting-started-guide).

***

## Usage

```js
var eslint = require('generate-eslint');
```

## API

### [eslint](index.js#L19)

Generate a `.eslintrc.json` file to the current working directory or specified `--dest` directory.

**Example**

```sh
$ gen eslint
```

### [ignore](index.js#L40)

Generate a `.eslintignore` file to the current working directory or specified `--dest` directory. This task is also aliased as `eslintignore`, in case you want to use this generator as a sub-generator or plugin and want to use the `ignore` task name for something else.

**Example**

```sh
$ gen eslint:ignore
```

### [eslint:default](index.js#L59)

Alias for the [eslint][] task.

**Example**

```sh
$ gen eslint:default
```

## Contributing

This document was generated by [verb](https://github.com/verbose/verb), please don't edit directly. Any changes to the readme must be made in [.verb.md](.verb.md). See [Building Docs](#building-docs).

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/generate/generate-eslint/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-readme-generator && verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/generate/generate-eslint/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on June 07, 2016._