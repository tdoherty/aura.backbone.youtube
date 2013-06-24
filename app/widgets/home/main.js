define(function (require) {
  var template = require('text!./home.html');
  return {
    initialize: function () {
      this.html(template);
    }
  };
});