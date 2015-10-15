module.exports = function(grunt) {

    /**
     * Properties used by tasks.
     */
    var config = {
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
    };
    
    /**
     * Loads all grunt tasks.
     */
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        
        /**
         * ------
         * Configuration properties.
         * ------
         */

        /**
         * Configuration values used to drive the build.
         */
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
            dev: { src: '<%= config.styles %>/*.css' },
            dist: { src: '<%= config.dist %>/Styles/*.css' }
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
                    '<%= config.styles %>/Site.css': '<%= config.styles %>/Site.scss'
                }
            },

            /**
             * Distributable version will be compressed.
             */
            dist: {
                options: { outputStyle: 'compressed' },
                files: {
                    '<%= config.dist %>/Styles/Site.css': '<%= config.styles %>/Site.scss'
                }
            }
        },
    });


    /**
     * ------
     * Multiple tasks registered into a single task. These tasks should be run 
     * via the `grunt` command.
     * ------
     */
    
    /**
     * Compiles Sass to CSS and then uses postcss to optimise and add vendor
     * prefixes.
     * `grunt styles`
     */
    grunt.registerTask('styles', ['sass:dev', 'postcss:dev']);
    grunt.registerTask('styles:dist', ['sass:dist', 'postcss:dist']);

    /**
     * Default task should be run while developing on the theme.
     */
    grunt.registerTask('default', ['']);
};