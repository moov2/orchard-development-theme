/* global $ */
"use strict";

var assert = require('chai').assert;

suite('setClasses', function() {
	var setClasses = require('browser/set-classes'),
		$html = $('html');
	
	setup(function () {

		// remove any CSS classes from root node.
		$html.prop('class', '');
	});
	
	test('should set `js` class on head of document', function () {
		setClasses();
	
		assert.isTrue($html.prop('class').split(' ').indexOf('js') > -1);
	});
	
	test('should remove `no-js` class from head of document', function () {
		$html.prop('class', 'no-js');
		
		setClasses();
		
		assert.isTrue($html.prop('class').split(' ').indexOf('no-js') === -1);
	});
});