/**
 * Main widget
 */
define(function (require) {
  var templates = {
    home: _.template(require('text!./home.html')),
    contact: _.template(require('text!./contact.html')),
    search: _.template(require('text!./search.html'))
  };

  return {
    initialize: function () {
      this.initRouter();
      this.$el.html(templates["home"]({}));
//      var s = this.sandbox.start(this.$el);
    },

    initRouter: function () {
      var self = this;
      var Router = Backbone.Router.extend({
        routes: {
          ':view(/:id)': 'view'
        }
      });

      var router = new Router();
      router.on('route:view', _.bind(function (view, id) {
        console.log(view);
        this.render(view, { id: id });
      }, this));
//      router.navigate('search', { trigger: true });
    },



    render: function (tpl, data) {
      var $mainContent = this.$el.find('#mainContent');
      this.sandbox.stop($mainContent);
      $mainContent.html(templates[tpl](data));
      var s = this.sandbox.start($mainContent);
    }
  };


//  var viewFactory = require('widgets/common/viewFactory');
//  var top = require('./top');
//
//  return function () {
//    //get the constructor from the factory
//    var TopView = viewFactory(this.sandbox, top);
//    new TopView({
//      el: this.$el
//    })
//  };

});