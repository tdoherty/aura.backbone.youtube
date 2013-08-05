define(function (require) {

  var ItemView = require('./itemView');
  var Collection = require('./collection');
  var Model = require('./model');

  Collection = Collection.extend({
    model: Model
  });
  
  return {

    type: 'Backbone',

    initialize: function () {
      var self = this;
      this.sandbox.on('controller.stop', _.bind(function () {
        this.remove();
      }, this));

      this.collection = new Collection();
      this.listenTo(this.collection, 'sync', this.render);

      this.html('<ul class="unstyled"></ul>');
      this.sandbox.on('nowplaying.relatedcontent', this.fetch, this);
    },

    render: function() {
      this.$('ul.unstyled').empty();
      this.collection.each(function(item) {
        var childView = new ItemView({ model: item, sandbox: this.sandbox });
        this.$('ul.unstyled').append(childView.render().$el);
      }, this);
    },

    fetch: function (data) {
      this.collection.url = data.id.$t + '/related' + '?format=5&alt=json-in-script';
      this.collection.fetch({ dataType: 'jsonp' });
    }
  };
});