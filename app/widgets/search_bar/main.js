define(function (require) {

  var template = require('text!./searchBar.html');
  var Model = require('./searchBarModel');
  Backbone.ModelBinder = require('components/Backbone.ModelBinder/Backbone.ModelBinder');

  return {
    type: 'Backbone',

    model: new Model(),

    initialize: function () {
      this.sandbox.on('controller.stop', _.bind(function () {
        this.remove();
      }, this));

      this.sandbox.on('global.search', _.bind(function (id) {
        this.model.set({ searchTerm: id });
      }, this));
      this.modelBinder = new Backbone.ModelBinder();

      this.render();
      this.modelBinder.bind(this.model, this.el);
    },

    events: {
      'keypress #searchTerm': 'onSearchKeyPress',
      'click .icon-search': 'search'
    },

    render: function () {
      this.html(template);
    },

    onSearchKeyPress: function (e) {
      if (e.which === 13)  {
        this.$(e.currentTarget).change();
        this.search();
      }
    },

    search: function () {
      this.sandbox.emit('global.search', this.model.get('searchTerm'));
      this.sandbox.emit('global.route', 'search/' + this.model.get('searchTerm'));
    }

  };
});