define(function (require) {

  var template = require('text!./main.html');
  var Model = require('./model');
  var Router = require('./router');

  return {

    type: 'Backbone',

    template: _.template(template),

    initialize: function () {
      var self = this;
      this.model = new Model();
      this.router = new Router();
      this.router.on('route:view', this.fetch, this);
      this.listenTo(this.model, 'sync', this.render);
      this.listenTo(this.model, 'sync', this.onSync);

      this.sandbox.on('nowplaying.contentChange', this.fetch, this);
      this.sandbox.on('controller.stop', _.bind(function () {
        this.remove();
      }, this));

      this.initParams();
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    initParams: function () {
      if (this.options.params) {
        this.model.videoSource = this.options.params.video;
        this.model.fetch();
      }
    },

    onSync: function () {
      this.sandbox.emit('nowplaying.relatedcontent', this.model.toJSON());
      this.sandbox.emit('nowplaying.sync', this.model.toJSON());
    },

    fetch: function (data) {
      this.model.videoSource = data;
      this.model.fetch();

    }
  };
});