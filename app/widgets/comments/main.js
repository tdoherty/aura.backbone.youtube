
define(function (require) {

  var ItemView = require('./itemView');
  var Collection = require('./collection');

  Collection = Collection.extend({
    model: Backbone.Model.extend({ idAttribute: 'source' })
  });
  
  return {

    type: 'Backbone',

    initialize: function () {
      var self = this;
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
      this.collection.url = data.gd$comments.gd$feedLink.href + '?format=5&alt=json-in-script';
      this.collection.fetch({ dataType: 'jsonp' });
    }
  };
});