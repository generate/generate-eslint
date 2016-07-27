**Plugin usage**

Use as a plugin in your generator:

```js
app.use(require('{%= name %}'));
app.task('default', ['eslintrc']);
```

**Sub-generator usage**

Use as a sub-generator:

```js
// use whatever name you want
app.register('foo', require('{%= name %}'));
// adds tasks to:
// - `foo:ignore`
// - `foo:eslintrc`

// use `.generate` to run sub-generator tasks
app.generate('foo:eslintrc', function(err) {
  if (err) console.log(err);
});
```
