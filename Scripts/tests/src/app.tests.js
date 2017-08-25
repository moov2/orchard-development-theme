import app from 'app'

suite('App', function () {
  suite('addLayer', function () {
    test('should call provided argument', function () {
      var testLayer = sinon.spy()

      app().addLayer(testLayer)

      assert.isTrue(testLayer.calledOnce)
    })

    test('should not error when argument is undefined', function () {
      app().addLayer()
    })
  })
})
