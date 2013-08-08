/**
 * simple widget for home page
 */
define(function (require) {
  var template = require('text!aura_components/home/home.html');
  return {
    initialize: function () {
      this.html(template);
    }
  };
});