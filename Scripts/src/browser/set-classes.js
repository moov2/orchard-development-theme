/* global $ */

"use strict";

/**
 * Adds CSS classes to the head of the document to signify that the browser
 * has JS enabled.
 */

module.exports = function () {
	$('html').removeClass('no-js').addClass('js');
};