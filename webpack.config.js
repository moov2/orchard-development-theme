"use strict";

const webpack = require('webpack');

module.exports = {
	entry: './Scripts/index.js',
    output: {
        path: __dirname + '/Scripts',
        filename: 'bundle.js'
    },
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loaders: ['babel-loader']
			}
		],
		rules: [{
            test: /\.js$/, // include .js files
            enforce: "pre", // preload jshint loader (must be used as a preloader aka before all other loaders.)
            exclude: /node_modules/, // exclude any and all files in the node_modules folder
            use: [{
				loader: "jshint-loader",
            	options: {
                    // any jshint option http://www.jshint.com/docs/options/
                    // i. e.
                    camelcase: true,
                    // jshint errors are displayed by default as warnings
                    // set emitErrors to true to display them as errors
                    emitErrors: false,
                    // jshint to not interrupt the compilation
                    // if you want any file with jshint errors to fail
                    // set failOnHint to true
                    failOnHint: false
                }
            }]
        }]
	},
    resolve: {
    	modules: [
    		"./Scripts/src", 
    		"./node_modules/shoestring/dist/"
    	]
    }
 };