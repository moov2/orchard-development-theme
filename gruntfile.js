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
         * Compiles JS modules into a single file using browserify.
         * http://browserify.org/
         * https://github.com/jmreidy/grunt-browserify
         */
        browserify: {
            options: {
                browserifyOptions: {
                    paths: [
                        './Scripts/src', 
                        './Scripts/tests/src'
                    ]
                }
            },
            
            /**
             * Compiles application modules into a single file.
             */
            app: {
                files: { '<%= config.js %>/core.js': ['<%= config.js %>/index.js'] }
            },
            
            /**
             * Compiles test suite into a single file to be ran by the `mocha`
             * task.
             */
            test: {
                files: { '<%= config.js %>/tests/suite.compiled.js': ['<%= config.js %>/tests/suite.js'] }
            }
        },
        
        /**
         * Runs the JavaScript test suite using mocha.
         * https://mochajs.org/
         * https://github.com/kmiyashiro/grunt-mocha
         */
        mocha: {
            all: {
                src: ['<%= config.js %>/tests/*.html'],
                options: {
                    run: true
                }
            }
        },
        
        /**
         * Performs tasks (e.g. optimisation) to CSS file compiled by CSS.
         * https://github.com/postcss/postcss
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
         * http://sass-lang.com/
         * https://github.com/sindresorhus/grunt-sass
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
        
        /**
         * Watches for changes to source files that should trigger build tasks to
         * be executed.
         */
        watch: {
            /**
             * Any changes to Sass files should trigger compilation of Sass to CSS.
             */
            styles: {
                files: ['<%= config.styles %>/**/*.scss'],
                tasks: ['styles']
            },
            
            /**
             * Any changes to JS files should trigger compilation of JS.
             */
            js: {
                files: ['<%= config.js %>/index.js','<%= config.js %>/*/**/*.js'],
                tasks: ['js']
            }
        }
    });


    /**
     * ------
     * Multiple tasks registered into a single task. These tasks should be run 
     * via the `grunt` command.
     * ------
     */
    
    
    /**
     * Handles JavaScript related build tasks such as concatenation, compression
     * and linting.
     * `grunt js`
     */
    grunt.registerTask('js', ['browserify', 'mocha']);
    
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
    grunt.registerTask('default', ['styles', 'js', 'watch']);
};