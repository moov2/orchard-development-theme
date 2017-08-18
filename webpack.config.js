"use strict";

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
		]
	},
    resolve: {
    	modules: [
    		"./Scripts/src", 
    		"./node_modules/shoestring/dist/"
    	]
    }
 };