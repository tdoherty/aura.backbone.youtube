define(function (require) {

  var Backbone = require('backbone');

  return Backbone.Router.extend({
    routes: {
      '(:view)(/:id)': 'view'
    }
  });
});