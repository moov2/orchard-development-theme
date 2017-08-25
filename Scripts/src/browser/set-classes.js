"use strict";

/**
 * Adds CSS classes to the head of the document to signify that the browser
 * has JS enabled.
 */

module.exports = function () {
	var $html = document.querySelector('html');
	$html.classList.remove('no-js');
	$html.classList.add('js');
};