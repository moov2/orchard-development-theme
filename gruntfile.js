module.exports = function(grunt) {

    /**
     * Properties used by tasks.
     */
    var config = {
        // paths to directories / files used in the process.
        paths: {
            /**
             * Directory that contains the CSS.
             */
            styles: './Styles',

            /**
             * Directory that contains the JavaScript.
             */
            js: './Scripts',
			
            /**
             * Theme artifacts from the build process will be placed in this directory.
             */
            dist: './dist'
        }
    };

    grunt.initConfig({
        /**
         * ------
         * Configuration properties.
         * ------
         */

        // configuration values used to drive the build.
        config: config,
    });

    // third party plugins used in the build process.


    // build tasks.

    /**
     * Default task should be run while developing on the theme.
     */
    grunt.registerTask('default', ['']);
};