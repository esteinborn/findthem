/* jshint node: true */
module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
              ' * Bootstrap v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
              ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              ' * Licensed under <%= _.pluck(pkg.licenses, "type") %> (<%= _.pluck(pkg.licenses, "url") %>)\n' +
              ' */\n',
    jqueryCheck: 'if (typeof jQuery === \'undefined\') { throw new Error(\'Bootstrap requires jQuery\') }\n\n',

    // Task configuration.

    jshint: {
      options: {
        "curly": true,
        "immed": true,
        "newcap": true,
        "noarg": true,
        "sub": true,
        "boss": true,
        "eqnull": true,
        "trailing": true,
        "globals": {
          "angular": true
        }
      },
      src: {
        // src: ['js/application.js', 'js/angular-wizard.js', 'js/filters.js', 'js/ng-scrollspy.js', 'js/angular-ui-bootstrap.js']
        src: ['js/*.js', '!js/*.min.js']
      }
    },

    csslint: {
      options: {
        csslintrc: 'configs/.csslintrc'
      },
      src: [
        'css/bootstrap.css',
        'css/app.css'
      ]
    },

    concat: {
      options: {
        stripBanners: false
      },
      bootstrap: {
        src: [
          'js/application.js',
          'js/angular-ui-bootstrap.js',
          'js/controllers.js',
          'js/filters.js',
          'js/ng-scrollspy.js'
        ],
        dest: 'js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      bootstrap: {
        options: {
          report: 'min'
        },
        src: 'js/<%= pkg.name %>.js',
        dest: 'js/<%= pkg.name %>.min.js'
      }
    },

    // This is for Ruby-based SASS compilation
    sass: {
      dev: {                            // Target
        options: {                       // Target options
          outputStyle: 'expanded',
          sourceComments: 'map'//,
          //sourceMap: true
        },
        files: {                         // Dictionary of files
          'css/bootstrap.css': 'scss/bootstrap.scss',       // 'destination': 'source'
          'css/app.css': 'scss/app.scss'
        }
      },
      dist: {                            // Target
        options: {                       // Target options
          style: 'compressed'
        },
        files: {                         // Dictionary of files
          'css/bootstrap.css': 'scss/bootstrap.scss',       // 'destination': 'source'
          'css/app.css': 'scss/app.scss'
        }
      }
    },

    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [
            'css/<%= pkg.name %>.css',
            'css/<%= pkg.name %>.min.css',
            'css/<%= pkg.name %>-theme.css',
            'css/<%= pkg.name %>-theme.min.css',
          ]
        }
      }
    },

    copy: {
      all: {
        files: [
          {
            expand: true,
            cwd: './',
            src: ['fonts/**/*', 'js/**/*', 'scss/**/*', 'css/**/*', '*.htm',],
            dest: 'J:/missing/tips/'
          }
        ]
      }
    },

    notify: {
      watch: {
        options: {
          title: 'Watch Task Complete',  // optional
          message: 'All Tasks Completed Successfully!', //required
        }
      }
    },

    watch: {
      src: {
        files: 'js/*.js',
        tasks: ['newer:jshint:src', 'concat', 'newer:copy:all', 'notify:watch'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: 'scss/**/*',
        tasks: ['sass:dev', 'newer:copy:all', 'notify:watch']
      },
      html: {
        files: '**/*.htm',
        tasks: ['newer:copy:all', 'notify:watch']
      },
      livereload: {
        files: ['css/**/*.css'],
        options: {
          livereload: true
        }
      }
    }

  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  // JS development task.
  grunt.registerTask('dev-js', ['jshint:src', 'concat']);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS development task.
  grunt.registerTask('dev-css', ['sass:dev', 'usebanner']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['sass:dist', 'usebanner']);

  // Full development task.
  grunt.registerTask('dev', ['dev-css', 'dev-js', 'copy:all']);

  // Full distribution task.
  grunt.registerTask('dist', ['dist-css', 'dist-js', 'copy:all']);

  // Default task.
  grunt.registerTask('default', ['dev', 'watch']);

};
