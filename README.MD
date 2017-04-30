# Lesshint Plugin for Webpack

[![npm](https://img.shields.io/npm/v/lesshint-extra-webpack-plugin.svg)](https://www.npmjs.com/package/lesshint-extra-webpack-plugin)


## Install

```console
$ npm install lesshint-extra-webpack-plugin
```

## Usage

In your webpack configuration:

```js
const LessHintPlugin = require('lesshint-extra-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new LessHintPlugin({
          files: [
              './source/applications/**/*.less',
              '!./vendor/**/*.less'
          ],
          configFile: path.resolve(__dirname, '.lesshintrc')
      })
  ],
  // ...
}
```

For using additional linters:

```js
const LessHintPlugin = require('lesshint-extra-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new LessHintPlugin({
          files: [
              './source/applications/**/*.less',
              '!./vendor/**/*.less'
          ],
          configFile: path.resolve(__dirname, '.lesshintrc'),
          linters : [
              require('./source/my-awesome-linter')
          ]
      })
  ],
  // ...
}
```

### Options

See [lesshint options](https://www.npmjs.com/package/lesshint#configuration), for the complete list of options.

* `configFile`: The config file location for your lesshint options.
* `files`: The glob pattern for finding files.
* `linters`: Additional linters to be used by lesshint.
* `reporter`: The reporter for lesshint. Default: `lesshint-reporter-stylish`.
* `failOnError` : If webpack build should fail if lesshint reported errors. Default: `false`.