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
    search: _.template(require('text!./search.html')),
    nowplaying: _.template(require('text!./nowplaying.html'))
  };

  // aura expects a module identifier of the format '__component__$<component name>@default'
  // which throws off relative paths, i.e., require('./router') so we need to use the full path
  // from the baseURL
  var Router = require('aura_components/app/router');

  return {
    initialize: function () {
      var self = this;

      //region aura event listeners
      this.sandbox.on('aura.sandbox.stop', function () {
        if (this.stopped) {
          console.log('stopped');
        }
      });

      this.sandbox.on('global.route', function (route) {
        self.router.navigate(route, { trigger: true });
      });
      //endregion

      //set the main template, the html() method causes aura to load any aura_components in the new markup
      this.html(templates['app']({}));
      this.currentTemplate = 'app';

      this.router = this.initRouter();

      if (location.hash) {
        //did the user navigate directly to or refresh an application state?
        //if so trigger the router to handle state change
        self.router.navigate(location.hash, { trigger: true });
      }
    },

    initRouter: function () {
      var router = new Router();
      router.on('route:view', this.handleRoute, this);
      return router;
    },

    /*
    * match a template name with the {:view} route param and render
    * */
    handleRoute: function (view, id) {
      var self = this;
      view = view || 'home';
      if (view !== this.currentTemplate) { //don't re-render the current view
        this.render(view, { id: id });
      }
      this.sandbox.emit('global.' + view, id);
      this.currentTemplate = view;
    },

    render: function (tpl, data) {
      var $mainContent = this.$el.find('#mainContent');

      //stop all child aura_components
      this.sandbox.emit('controller.stop');

      //replace the 'mainContent' div with the selected template
      $mainContent.html(templates[tpl](data));

      //tell Aura to look for and start new aura_components in the markup
      this.sandbox.start(this.$el);
    }
  };

});