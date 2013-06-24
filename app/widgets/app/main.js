/**
 * Main widget - essentially functions like a controller, replacing the layout on
 * router hash change events
 */
define(function (require) {

  //these are the main layouts for the app, containing aura widget declarations
  var templates = {
    app: _.template(require('text!./app.html')),
    home: _.template(require('text!./home.html')),
    contact: _.template(require('text!./contact.html')),
    search: _.template(require('text!./search.html'))
  };

  return {
    initialize: function () {
      var self = this;
      this.router = this.initRouter();
      this.html(templates['app']({}));
      this.currentTemplate = 'app';
      console.log('started');
      this.sandbox.on('aura.sandbox.stop', function() {
        if (this.stopped) {
          console.log('stopped');
        }
      });

     this.sandbox.on('global.route', function (route) {
        self.router.navigate(route, { trigger: true });
      });
    },

    initRouter: function () {
      var self = this;
      var Router = Backbone.Router.extend({
        routes: {
          '(:view)(/:id)': 'view'
        }
      });

      var router = new Router();
      router.on('route:view', _.bind(function (view, id) {
        console.log(view);
        view = view || 'home';
        if (view !== this.currentTemplate) {
          this.render(view, { id: id });
        } else if (id && this.currentTemplate === "search") {
          self.sandbox.emit('global.search', id);
        }
        this.currentTemplate = view;

      }, this));

      return router;
    },

    render: function (tpl, data) {
      var $mainContent = this.$el.find('#mainContent');

      //stop all child widgets
//      this.sandbox.stop();
      this.sandbox.emit('controller.stop');
      $mainContent.html(templates[tpl](data));
      //tell Aura to look for widgets in the new markup
      var s = this.sandbox.start($mainContent);
    }
  };

});