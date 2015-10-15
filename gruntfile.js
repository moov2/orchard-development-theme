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
        
        /**
         * ------
         * Build tasks.
         * ------
         */
        
        /**
         * Performs tasks (e.g. optimisation) to CSS file compiled by CSS.
         */
        postcss: {
            options: {
                processors: [require('autoprefixer')({browsers: 'last 1 version'})]
            },
            dev: { src: '<%= config.paths.styles %>/*.css' },
            dist: { src: '<%= config.paths.dist %>/Styles/*.css' }
        },
        
        /**
         * Handles compiling Sass to CSS.
         */
        sass: {
            options: {
                sourceMap: false
            },

            /**
             * Development version will be uncompressed.
             */
            dev: {
                files: {
                    '<%= config.paths.styles %>/Site.css': '<%= config.paths.styles %>/Site.scss'
                }
            },

            /**
             * Distributable version will be compressed.
             */
            dist: {
                options: { outputStyle: 'compressed' },
                files: {
                    '<%= config.paths.dist %>/Styles/Site.css': '<%= config.paths.styles %>/Site.scss'
                }
            }
        },
    });

    // third party plugins used in the build process.
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-sass');

    // build tasks.
    
    /**
     * Handles creation of CSS files.
     */
    grunt.registerTask('styles', ['sass:dev', 'postcss:dev']);
    grunt.registerTask('styles:dist', ['sass:dist', 'postcss:dist']);

    /**
     * Default task should be run while developing on the theme.
     */
    grunt.registerTask('default', ['']);
};