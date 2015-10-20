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
         * Deletes previous build arefacts
         */
        clean: {
            dist: ['<%= config.dist %>']
        },
        
        /**
         * Tidies things up by removing empty directories from the distributable
         * directory.
         */
        cleanempty: {
            options: { files: false },
            src: ['<%= config.dist %>/**/*']
        },
        
        /**
         * Copies files.
         */
        copy: {
            
            /**
             * Copies files appropriate for a release version into the 
             * distributable directory.
             */
            dist: {
                files: [{   
                    expand: true,
                    src: [
                        '**', 
                        '!bower_components/**', 
                        '!node_modules/**',
                        '!Scripts/tests/**',  
                        '!package.json', 
                        '!bower.json',
                        '!gruntfile.js', 
                        '!*.cmd', 
                        '!README.md', 
                        '!**/*.scss', 
                        '!**/*.js'
                    ], 
                    dest: '<%= config.dist %>' }
                ]
            }
        },

        
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
             * Compiles top level app & test modules into single file.
             */
            dev: {
                files: [
                    { '<%= config.js %>/core.js': ['<%= config.js %>/index.js'] },
                    { '<%= config.js %>/tests/tests.js': ['<%= config.js %>/tests/suite.js'] }
                ]
            }
        },

        /**
         * Analyses JavaScript files using JSHint for errors or potential problems.
         * You can customise the parameters by modifying the .jshintrc file.
         * http://jshint.com/
         */
        jshint: {
            all: [
                'gruntfile.js',
                '<%= config.js %>/**/*.js',
                '!<%= config.js %>/core.js',
                '!<%= config.js %>/tests/tests.js'
            ],
            options: {
                jshintrc: true
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
         * Compresses JavaScript to reduce the file size.
         * https://github.com/mishoo/UglifyJS
         * https://github.com/gruntjs/grunt-contrib-uglify
         */
        uglify: {
            dist: {
                files: { '<%= config.dist %>/Scripts/core.js': ['<%= config.js %>/core.js'] }
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
    grunt.registerTask('js', ['jshint', 'browserify', 'mocha']);
    grunt.registerTask('js:dist', ['jshint', 'browserify', 'mocha', 'uglify']);
    
    /**
     * Compiles Sass to CSS and then uses postcss to optimise and add vendor
     * prefixes.
     * `grunt styles`
     */
    grunt.registerTask('styles', ['sass:dev', 'postcss:dev']);
    grunt.registerTask('styles:dist', ['sass:dist', 'postcss:dist']);
    
    /**
     * Creates a distributable version of the theme, placing artefacts in the
     * configured distributable directory.
     */
    grunt.registerTask('dist', ['clean:dist', 'copy:dist', 'styles:dist', 'js:dist', 'cleanempty']);

    /**
     * Default task should be run while developing on the theme.
     */
    grunt.registerTask('default', ['styles', 'js', 'watch']);
};