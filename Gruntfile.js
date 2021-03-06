// Generated on 2013-09-26 using generator-angular 0.4.0
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // configurable paths
    var yeomanConfig = {
        tmp: '.tmp',
        app: 'app',
        config: 'config',
        dist: 'dist',
        heroku: 'heroku',
        distHeroku: 'distHeroku'
    };

    var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
    //grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-shell');

    try {
        yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
    } catch (e) {
    }

    grunt.initConfig({
        yeoman: yeomanConfig,
        shell: {
            deployHeroku: {
                options: {
                    stdout: true,
                    execOptions: {
                        cwd: '<%= yeoman.distHeroku%>'
                    }
                },
                command: [
                    'git add .',
                    'git commit -m "See commit messages in the Github repository"',
                    'git push origin master'
                ].join('&&')
            },
            runHeroku: {
                options: {
                    stdout: true,
                    execOptions: {
                        cwd: '<%= yeoman.distHeroku%>'
                    }
                },
                command: [
                    'heroku ps:scale web=1',
                    'heroku open'
                ].join('&&')
            },
            stopHeroku: {
                options: {
                    stdout: true,
                    execOptions: {
                        cwd: '<%= yeoman.distHeroku%>'
                    }
                },
                command: [
                    'heroku ps:scale web=0'
                ].join('&&')
            }

        },
        watch: {
            coffee: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '<%= yeoman.tmp%>'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '<%= yeoman.tmp%>'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '<%= yeoman.tmp%>',
                            '<%= yeoman.dist %>/*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            distHeroku: {
                files: [
                    {
                        dot: true,
                        src: [
                            '<%= yeoman.distHeroku %>/*',
                            '!<%= yeoman.distHeroku %>/.git*'
                        ]
                    }
                ]
            },
            server: '<%= yeoman.tmp%>'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ]
        },
        coffee: {
            options: {
                sourceMap: true,
                sourceRoot: ''
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/scripts',
                        src: '{,*/}*.coffee',
                        dest: '.tmp/scripts',
                        ext: '.js'
                    }
                ]
            },
            test: {
                files: [
                    {
                        expand: true,
                        cwd: 'test/spec',
                        src: '{,*/}*.coffee',
                        dest: '.tmp/spec',
                        ext: '.js'
                    }
                ]
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
         dist: {}
         },*/
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>/<%= yeoman.app %>',
                        src: [
                            './**/*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.config %>',
                        dest: '<%= yeoman.dist %>/<%= yeoman.config %>',
                        src: [
                            './**/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/images',
                        src: [
                            'generated/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            'package.json',
                            'server.js'
                        ]
                    }
                ]
            },
            distHeroku: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.dist %>',
                        dest: '<%= yeoman.distHeroku %>',
                        src: [
                            './**/*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.heroku %>',
                        dest: '<%= yeoman.distHeroku %>',
                        src: [
                            './**/*'
                        ]
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        concurrent: {
            server: [
                'coffee:dist',
                'copy:styles'
            ],
            test: [
                'coffee',
                'copy:styles'
            ],
            dist: [
                'coffee',
                'copy:styles'
            ]
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        ngmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.dist %>/scripts',
                        src: '*.js',
                        dest: '<%= yeoman.dist %>/scripts'
                    }
                ]
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': [
                        '<%= yeoman.dist %>/scripts/scripts.js'
                    ]
                }
            }
        }
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:ser',
            'configureProxies',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'copy:dist',
        'ngmin',
        'uglify',
        'rev'
    ]);

    grunt.registerTask('build:heroku', [
        'clean:distHeroku',
        'build',
        'copy:distHeroku'
    ]);

    grunt.registerTask('deploy:heroku', [
        'build:heroku',
        'shell:deployHeroku'
    ]);

    grunt.registerTask('run:heroku', [
        'shell:runHeroku'
    ]);

    grunt.registerTask('stop:heroku', [
        'shell:stopHeroku'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};