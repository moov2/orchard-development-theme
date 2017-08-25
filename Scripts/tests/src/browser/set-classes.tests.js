import { assert } from 'chai';
import setClasses from 'browser/set-classes';

suite('setClasses', function() {
	var $html = document.querySelector('html');
	
	setup(function () {
		// remove any CSS classes from root node.
		$html.className = '';
	});
	
	test('should set `js` class on head of document', function () {
		setClasses();
	
		assert.isTrue($html.className.split(' ').indexOf('js') > -1);
	});
	
	test('should remove `no-js` class from head of document', function () {
		$html.className = 'no-js';
		
		setClasses();
		
		assert.isTrue($html.className.split(' ').indexOf('no-js') === -1);
	});
});