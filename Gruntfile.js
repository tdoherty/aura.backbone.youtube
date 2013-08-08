'use strict';

module.exports = function (grunt) {

  // Underscore
  // ==========
  var _ = grunt.util._;

  // Package
  // =======
  var pkg = grunt.file.readJSON('./package.json');

  // Widgets
  // =======´
  var widgets = require('fs').readdirSync('./app/aura_components');

  // Extensions
  // =======´
  var extensions = require('fs').readdirSync('./app/extensions');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-targethtml');

  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  var PORT = 8765;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    yeoman: yeomanConfig,
    connect: {
      server: {
        options: {
          port: PORT,
          base: '.'
        }
      }
    },
    requirejs: {
      options: {
        baseUrl: '.',
        optimize: 'none',
        preserveLicenseComments: true,

        paths: {
          aura: 'bower_components/aura/lib/',
          underscore: 'bower_components/underscore/underscore',
          eventemitter: 'bower_components/eventemitter2/lib/eventemitter2',
          backbone: 'bower_components/backbone/backbone',
          handlebars: 'bower_components/handlebars/handlebars',
          text: 'bower_components/requirejs-text/text',
          jquery: 'bower_components/jquery/jquery',
          almond: 'bower_components/almond/almond',
          layoutmanager: 'bower_components/layoutmanager/backbone.layoutmanager',
          modelBinder: 'bower_components/Backbone.ModelBinder/Backbone.ModelBinder'

        },
        shim: {
          backbone: {
            exports: 'Backbone',
            deps: ['underscore', 'jquery']
          },
          underscore: {
            exports: '_'
          },
          handlebars: {
            exports: 'Handlebars'
          }
        },
        onBuildWrite: function(moduleName, path, contents) {
//          console.log(path);
          _.each(widgets, function(widgetDir) {
            if(moduleName === 'aura_components/' + widgetDir + '/main') {
//              console.log(moduleName);
              contents = contents.replace('aura_components/' + widgetDir + '/main', '__component__$' + widgetDir + '@default');
            }
//            if (moduleName.indexOf('text!') !== -1) {
//              var paths = moduleName.split('/');
//              var mod = paths[paths.length-1];
//              contents = contents.replace('text!aura_components/' + widgetDir + '/' + mod, '__component__$' + widgetDir + '@default/' + mod);
//            }
          });
          return contents;
        }
      },
      perFile: {
        options: {
          dir: 'build/js',
          modules: (function() {
            // Get auraExtensions
            var output = [];

            // Include Aura
            output.push({
              name: 'main',
              include: ['aura/ext/mediator', 'aura/ext/components', 'main', 'text']
            });

            // Include Widget
            _.each(widgets, function(widgetDir) {
              output.push({
                name: 'widgets/' + widgetDir + '/main',
                exclude: ['main']
              });
            });

            return output;
          })()
        }
      },
      oneFile: {
        options: {
//          almond: true,
          wrap: true,
          insertRequire: ['main'],
          out: "dist/main.js",
          baseUrl: 'app',
          include: (function() {
            // Include Aura
            var output = ['bower_components/requirejs/require', 'underscore', 'jquery', 'main', 'aura/ext/mediator', 'aura/ext/components', 'aura/ext/debug', 'text'];
            // Include Extensions
            _.each(extensions, function(extDir) {
              output.push('extensions/' + extDir.split('.')[0]);
            });
            // Include Widget
            _.each(widgets, function(widgetDir) {
              output.push('aura_components/' + widgetDir + '/main');
            });
            return output;
          })()
        }
      }
    },
//    requirejs: {
//      compile: {
//        options: {
//          baseUrl: '.',
//          optimize: 'none',
//          paths: {
//            aura: 'app/bower_components/aura/lib',
//            jquery: 'empty:',
//            underscore: 'empty:',
//            eventemitter: 'app/bower_components/eventemitter2/lib/eventemitter2'
//          },
//          shim: {
//            underscore: {
//              exports: '_'
//            }
//          },
//          include: [
//            'app/main'
//          ],
//          exclude: ['jquery', 'aura/aura'],
//          out: '<%= yeoman.dist %>/main.js'
//        }
//      }
//    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt,js,html}',
            '.htaccess',
//            'bower_components/**/*',
            'images/**/*',
            'img/**/*',
            'styles/**/*',
//            'aura_components/**/*',
//            'extensions/**/*'
          ]
        }//,
//          {
//            expand: true,
//            dot: true,
//            cwd: './build',
//            dest: '<%= yeoman.dist %>',
//            src: [
//              'main.js'
//              ]
//          }
        ]
      }
    },
    targethtml: {
      dist: {
        files: {
          'dist/index.html': 'app/index.html'
        }
      }
    },
    jshint: {
      all: {
        options: {
          jshintrc: '.jshintrc'
        },
        files: {
          src: [
          'app/aura_components/**.js',
          'app/extensions/**.js',
          'app/main.js',
          ]
        }
      }
    },
    compass: {
      options: {
        sassDir : '<%= yeoman.app %>/styles',
        cssDir: '<%= yeoman.app %>/styles',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        force: true,
        relativeAssets: true
      },
      main: {}
    },
    mocha: {
      all: {
        options: {
          urls: ['http://localhost:<%= connect.server.options.port %>/spec/index.html']
        },
        dist: {},
      }
    },
    watch: {
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      spec: {
        files: [
          '**/*.js'
        ],
        tasks: ['spec']
      }
    },
    clean: {
      dist: ['<%= yeoman.dist %>/**']
    }
  });

  grunt.registerTask('spec', ['jshint', 'connect', 'mocha']);
  grunt.registerTask('build', ['clean', 'copy', 'requirejs:oneFile', 'targethtml']);
//  grunt.registerTask('build', ['clean', 'compass', 'spec', 'copy', 'requirejs']);
  grunt.registerTask('default', ['compass', 'spec', 'watch']);
};
