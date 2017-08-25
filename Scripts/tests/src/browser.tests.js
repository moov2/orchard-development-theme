import browser from 'browser'

suite('Browser', function () {
  test('should call provided enhancements', function () {
    var spies = [sinon.spy(), sinon.spy(), sinon.spy()]
    browser(spies)

    for (var i = 0; i < spies.length; i++) {
      assert.isTrue(spies[i].calledOnce)
    }
  })
})
