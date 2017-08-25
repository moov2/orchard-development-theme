"use strict";

/**
 * Entry point for compiling modules into a single file.It shouldn't be 
 * necessary to add JS code to this file, instead `app/app.js` should 
 * be used as the starting point for JavaScript code.
 */

var app = require('app')(),
	browser = require('browser');

/**
 * Setup different layers of the application.
 */

app.addLayer(browser);