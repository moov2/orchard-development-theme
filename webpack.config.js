const path = require('path')

module.exports = [{
  entry: './Scripts/index.js',
  output: {
    path: path.resolve(__dirname, '/Scripts'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /.*\.js$/,
      exclude: /(node_modules)/,
      loaders: ['babel-loader']
    }]
  },
  resolve: {
    modules: ['./Scripts/src']
  }
}, {
  entry: './Scripts/tests/suite.js',
  output: {
    path: path.resolve(__dirname, '/Scripts/tests'),
    filename: 'suite.bundle.js'
  },
  module: {
    loaders: [{
      test: /.*\.js$/,
      exclude: /(node_modules)/,
      loaders: ['babel-loader']
    }]
  },
  resolve: {
    modules: [
      './Scripts/src',
      './Scripts/tests/src'
    ]
  }
}]
