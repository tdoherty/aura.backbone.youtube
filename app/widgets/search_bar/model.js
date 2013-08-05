/**
 * Search bar model
 */
define(function (require) {

  //module dependencies
  var Backbone = require('backbone');

  return Backbone.Model.extend({
    defaults: {
      searchTerm: ''
    }
  });
});
