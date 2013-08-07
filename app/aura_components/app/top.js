define(function () {

  return {
    events: {
      'click': function () {
        alert('clicked');
      }
    },
    initialize: function () {
      this.render();
      this.sandbox.on('title.clicked', function () {
        console.warn('It said hello');
      });
    },
    render: function () {
      this.$el.html('Hello Backbone');
      return this;
    }
  };

});