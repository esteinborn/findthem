/* jshint node: true */
module.exports = function (grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

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
        src: ['js/*.js', '!js/*.min.js', '!js/bootstrap.js']
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
          'js/ui-bootstrap-custom-tpls-0.10.0.js',
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

    copy: {
      all: {
        files: [
          {
            expand: true,
            cwd: './',
            src: ['fonts/**/*', 'data/**/*', 'js/**/*', 'scss/**/*', 'css/**/*', '*.htm',],
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
  grunt.registerTask('dev-css', ['sass:dev']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['sass:dist']);

  // Full development task.
  grunt.registerTask('dev', ['dev-css', 'dev-js', 'copy:all']);

  // Full distribution task.
  grunt.registerTask('dist', ['dist-css', 'dist-js', 'copy:all']);

  // Default task.
  grunt.registerTask('default', ['dev', 'watch']);

};
