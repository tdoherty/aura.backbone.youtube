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
    className: 'yt-lockup2 yt-lockup2-video yt-uix-tile context-data-item clearfix',

//------Backbone implementations----------------------------------------------------------------------------------------
    initialize: function () {
//      this.listenTo(this.model, {
//        'change': this.render
//      });
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

//------Event Handlers--------------------------------------------------------------------------------------------------

//------DOM Helpers-----------------------------------------------------------------------------------------------------

  });
});
