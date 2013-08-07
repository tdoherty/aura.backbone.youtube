/**
 * Search bar widget
 *
 * Remarks:
 * - uses extensions/aura-backbone for an integrated Backbone View widget
 * - uses Backbone.ModelBinder for two-way binding between view and model
 */
define(function (require) {

  var template = require('text!./main.html');
  // aura expects a module identifier of the format '__component__$<component name>@default'
  // which throws off relative paths, i.e., require('./router') so we need to use the full path
  // from the baseURL
  var Model = require('aura_components/search_bar/model');
//  var Router = require('aura_components/router/router');
  Backbone.ModelBinder = require('modelBinder');

  return {
    type: 'Backbone', //from extensions/aura-backbone

    model: new Model(),

    events: {
      'keypress #searchTerm': 'onSearchKeyPress',
      'click .icon-search': 'search'
    },

    initialize: function () {
      var self = this;
      //use a dedicated router to monitor search hash changes
//      this.router = new Router();
//      this.router.on('route:view', this.doSearch, this);

      //region aura event listeners
      this.sandbox.on('controller.stop',function () {
        this.stop();
      });

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
      var searchTerm = this.model.get('searchTerm');
      //use the aura mediator to emit a global route event
      this.sandbox.emit('global.route', 'search/' + searchTerm);
      this.sandbox.emit('search.search', searchTerm);
    },

    doSearch: function (id) {
      this.model.set({ searchTerm: id });
      this.sandbox.emit('search.search', id);
    }
    //endregion

  };
});