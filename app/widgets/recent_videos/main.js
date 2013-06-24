define({
  initialize: function () {
    var self = this;
    this.$el.html('Recent Videos');
    this.sandbox.on('aura.sandbox.stop', function () {
      if (this.stopped) {
        self.$el.remove();
      }
    });
  }
});