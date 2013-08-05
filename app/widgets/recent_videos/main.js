define(function (require) {
  var ItemView = require('./itemView');

  var Model = Backbone.Model.extend({ idAttribute: 'source' });
  return {
    type: 'Backbone',

    maxEntries: 10,

    collection: new Backbone.Collection(),

    initialize: function () {
      var self = this;
      this.$el.html('<ul class="nav nav-list unstyled"></ul>');
      this.listenTo(this.collection, 'add', this.render);
      this.sandbox.on('nowplaying.sync', this.add, this);

//      this.sandbox.on('controller.stop', _.bind(function () {
//        this.remove();
//      }, this));
      if (this.collection.length) {
        this.render();
      }
    },

    render: function () {
      this.$('ul.unstyled').empty();
      this.collection.each(function(item) {
        var childView = new ItemView({ model: item, sandbox: this.sandbox });
        this.$('ul.unstyled').append(childView.render().$el);
      }, this);
    },

    add: function (data) {
      this.collection.unshift(new Model(data));
      if (this.collection.length > this.maxEntries) {
        this.collection.pop();
      }
    }
  };
});