/**
 * RequireJS Module Definition - AMD 'sugar' syntax
 */
define(function (require) {

  //module dependencies
  var template = require('text!./item.html');

  return Backbone.View.extend({

//------Properties------------------------------------------------------------------------------------------------------
    template: _.template(template),

    tagName: 'li',
    className: 'comment',

//------Backbone implementations----------------------------------------------------------------------------------------
    initialize: function () {
      this.sandbox = this.options.sandbox;
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

//------Event Handlers--------------------------------------------------------------------------------------------------

//------DOM Helpers-----------------------------------------------------------------------------------------------------

  });
});
