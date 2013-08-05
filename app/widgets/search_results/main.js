/**
 * Search Results Widget
 *
 * Remarks:
 * - uses extensions/aura-backbone for an integrated Backbone View widget
 */
define(function (require) {

  var template = require('text!./main.html');
  var SearchItemView = require('./itemView');
  var Collection = require('./collection');
  var Result = require('./model');

  Collection = Collection.extend({
    model: Result
  });
  
  return {

    type: 'Backbone', //from extensions/aura-backbone

    initialize: function () {
      var self = this;
      this.collection = new Collection();

      //local event listeners
      this.listenTo(this.collection, 'sync', this.render);

      //region aura event listeners
      this.sandbox.on('global.search', this.search, this);
      this.sandbox.on('search.search', this.search, this);
      this.sandbox.on('controller.stop', _.bind(function () {
        this.remove();
      }, this));
      //endregion

      this.html(template);
      this.initParams();
    },

    render: function() {
      this.$('ul.unstyled').empty();
      this.collection.each(function(item) {
        var childView = new SearchItemView({ model: item });
        this.$('ul.unstyled').append(childView.render().$el);
      }, this);
    },

    search: function (searchTerm) {
      var logger = this.sandbox.logger;
      logger.log(searchTerm);
      this.collection.searchTerm = searchTerm;
      this.collection.fetch({ dataType: 'jsonp' });
    },

    /**
     * read parameters from the widget declaration:
     * if the user typed search param in the URL, or clicked
     * search from the now playing screen, trigger a search event
     */
    initParams: function () {
      if (this.options.params && this.options.params.searchTerm) {
        this.sandbox.emit('global.search', this.options.params.searchTerm);
      }
    }
  };
});