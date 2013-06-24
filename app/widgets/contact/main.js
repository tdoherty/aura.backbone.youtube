define({
  initialize: function () {
    var self = this;
    this.$el.html('Contact');
    this.sandbox.on('aura.sandbox.stop', function () {
//      if (this._parent.stopped) {
        self.$el.remove();
//      }
    });
  }
});