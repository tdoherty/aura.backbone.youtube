/**
 * simple widget for home page
 */
define(function (require) {
  var template = require('text!./home.html');
  return {
    initialize: function () {
      this.html(template);
    }
  };
});