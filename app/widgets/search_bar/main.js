/**
 * Search bar widget
 *
 * Remarks:
 * - uses extensions/aura-backbone for an integrated Backbone View widget
 * - uses Backbone.ModelBinder for two-way binding between view and model
 */
define(function (require) {

  var template = require('text!./main.html');
  var Model = require('./model');
  var Router = require('./router');
  Backbone.ModelBinder = require('components/Backbone.ModelBinder/Backbone.ModelBinder');

  return {
    type: 'Backbone', //from extensions/aura-backbone

    model: new Model(),

    events: {
      'keypress #searchTerm': 'onSearchKeyPress',
      'click .icon-search': 'search'
    },

    initialize: function () {

      //use a dedicated router to monitor search hash changes
      this.router = new Router();
      this.router.on('route:view', this.doSearch, this);

      //region aura event listeners
      this.sandbox.on('controller.stop', _.bind(function () {
        this.remove();
      }, this));

      this.sandbox.on('global.search', _.bind(function (id) {
        this.model.set({ searchTerm: id });
      }, this));
      //endregion

      this.render();

      //setup the modelbinder plugin for two-way data binding
      this.modelBinder = new Backbone.ModelBinder();
      this.modelBinder.bind(this.model, this.el);
    },

    render: function () {
      this.html(template);
    },

    //region event handlers
    onSearchKeyPress: function (e) {
      if (e.which === 13)  {
        this.$(e.currentTarget).change();
        this.search();
      }
    },

    search: function () {
      //use the aura mediator to emit a global route event
      this.sandbox.emit('global.route', 'search/' + this.model.get('searchTerm'));
    },

    doSearch: function (id) {
      this.model.set({ searchTerm: id });
      this.sandbox.emit('search.search', id);
    }
    //endregion

  };
});