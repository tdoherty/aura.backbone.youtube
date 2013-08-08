define(function (require) {

  // aura expects a module identifier of the format '__component__$<component name>@default'
  // which throws off relative paths, i.e., require('./router') so we need to use the full path
  // from the baseURL
  var template = require('text!aura_components/now_playing/main.html');
  var Model = require('aura_components/now_playing/model');

  return {

    type: 'Backbone', //from extensions/aura-backbone

    template: _.template(template),

    initialize: function () {
      var self = this;
      this.model = new Model();
      this.listenTo(this.model, 'sync', this.render);
      this.listenTo(this.model, 'sync', this.onSync);

      this.sandbox.on('global.nowplaying', this.fetch, this);
      this.sandbox.on('nowplaying.contentChange', this.fetch, this);
      this.sandbox.on('controller.stop', function () {
        this.stop();
      });

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

    //region event handlers
    onSync: function () {
      this.sandbox.emit('nowplaying.relatedcontent', this.model.toJSON());
      this.sandbox.emit('nowplaying.sync', this.model.toJSON());
    },

    fetch: function (id) {
        this.model.videoSource = id;
        this.model.fetch();
    }
    //endregion
  };
});