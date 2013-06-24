define(function (require) {

  var template = require('text!./searchList.html');
  var SearchItemView = require('./searchItem');
  var Collection = require('./searchCollection');
  var Result = require('./result');

  Collection = Collection.extend({
    model: Result
  });
  
  return {

    type: 'Backbone',

    initialize: function () {
      var self = this;
      this.collection = new Collection();
      this.listenTo(this.collection, 'sync', this.render);

      this.sandbox.on('global.search', function (searchTerm) {
        console.log(searchTerm);
        self.collection.searchTerm = searchTerm;
        self.collection.fetch();
      });

      this.html(template);

      this.initParams();
    },

//--Backbone.Layoutmanager implementations------------------------------------------------------------------------------
    render: function() {
      this.$('ul.unstyled').empty();
      this.collection.each(function(item) {
        var childView = new SearchItemView({ model: item });
        this.$('ul.unstyled').append(childView.render().$el);
      }, this);
    },

    initParams: function () {
      if (this.options.params) {
        this.sandbox.emit('global.search', this.options.params.searchTerm);
//        this.collection.searchTerm = this.options.params.searchTerm;
//        this.collection.fetch();
      }
    }
  };
});