module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      './Scripts/tests/suite.bundle.js'
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    client: {
      mocha: {
        ui: 'tdd'
      }
    }
  })
}
