const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = [{
  name: 'js',
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
  name: 'js-tests',
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
}, {
  name: 'css',
  entry: {
    main: './Styles/Site.scss'
  },
  output: {
    path: path.resolve(__dirname, './Styles'),
    filename: 'Site.css'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [autoprefixer('last 1 version', 'ie 10')]
            }
          }
        }, {
          loader: 'sass-loader'
        }]
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin('Site.css')
  ]
}]
