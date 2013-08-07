/**
 * RequireJS Module Definition - AMD 'sugar' syntax
 */
define(function (require) {

  //module dependencies
  var Backbone = require('backbone');
  var template = require('text!./item.html');

  return Backbone.View.extend({

//------Properties------------------------------------------------------------------------------------------------------
    template: _.template(template),

    tagName: 'li',
    className: 'video-list-item',

//------Backbone implementations----------------------------------------------------------------------------------------
    events: {
      'click': 'onClick'
    },

    initialize: function () {
      this.sandbox = this.options.sandbox;
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

//------Event Handlers--------------------------------------------------------------------------------------------------
    onClick: function () {
      this.sandbox.emit('nowplaying.contentChange', this.model.get('source'));
//      this.sandbox.emit('global.route', 'nowplaying/' + this.model.get('source'));
    }
//------DOM Helpers-----------------------------------------------------------------------------------------------------

  });
});
