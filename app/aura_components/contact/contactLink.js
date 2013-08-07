/**
 * RequireJS Module Definition - AMD 'sugar' syntax
 */
define(function (require) {

  //module dependencies
  var Backbone = require('backbone');
  var template = require('text!./link.html');

  return Backbone.View.extend({

//------Properties------------------------------------------------------------------------------------------------------
    template: _.template(template),

    tagName: 'li',
    className: 'contactLink',

//------Backbone implementations----------------------------------------------------------------------------------------
    initialize: function () {

    },

    render: function () {
      this.$el.html(this.template(this.model));
      return this;
    }

//------Event Handlers--------------------------------------------------------------------------------------------------

//------DOM Helpers-----------------------------------------------------------------------------------------------------

  });
});
