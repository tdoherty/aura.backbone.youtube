/**
 * RequireJS Module Definition - AMD 'sugar' syntax
 */
define(function (require) {

  //module dependencies
  var Backbone = require('backbone');

  return Backbone.Collection.extend({
    parse: function (response) {
      return response.feed.entry;
    }
  });
});
