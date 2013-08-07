define(function() {
  return function(app) {
    var _ = app.core.util._;
    var historyStarted = false;
    var Backbone;
    return {
      require: {
        paths: { 
          backbone: 'bower_components/backbone/backbone',
          underscore: 'bower_components/underscore/underscore',
          layoutmanager: 'bower_components/layoutmanager/backbone.layoutmanager'
        },
        shim: {
          backbone: { exports: 'Backbone', deps: ['underscore', 'jquery'] },
          layoutmanager: { exports: 'Backbone.LayoutManager', deps: ['backbone', 'underscore'] }
        }
      },
      initialize: function(app) {
        Backbone = require('backbone');
        require('layoutmanager');
//        Backbone.LayoutManager = require('layoutmanager');
        app.core.Layout = Backbone.Layout;
        app.sandbox.Layout = Backbone.Layout;
      },
      afterAppStart: function(app) {

        // Localize or create a new JavaScript Template object.
        var JST = window.JST = window.JST || {};

        //setup underscore templates alternate interpolate/evaluate regex's
        _.templateSettings = {
          interpolate : /\{\{(.+?)\}\}/g,
          evaluate: /\{%(.+?)%\}/g
        };

        //configure layoutmanager
        Backbone.Layout.configure({
          // Allow LayoutManager to augment Backbone.View.prototype.
          manage: true,

          prefix: "app/templates/",

          fetch: function(path) {
            // Concatenate the file extension.
            path = path + ".html";

            // If cached, use the compiled template.
            if (JST[path]) {
              return JST[path];
            }

            // Put fetch into `async-mode`.
            var done = this.async();

            // Seek out the template asynchronously.
            $.get(path, function(contents) {
              done(JST[path] = _.template(contents));
            });
          }
        });
      }
    }
  }
});