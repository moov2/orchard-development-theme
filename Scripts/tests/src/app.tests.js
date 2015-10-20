"use strict";

var App = require('app'),
	expect = require('chai').expect

suite('App', function() {
    test('App should not be undefined', function() {
		expect(App).to.not.be.undefined;
    });
});

