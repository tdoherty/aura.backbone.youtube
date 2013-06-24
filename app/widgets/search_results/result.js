/**
 * RequireJS Module Definition - AMD 'sugar' syntax
 */
define(function (require) {

  //module dependencies
  var Backbone = require('backbone');

  return Backbone.Model.extend({
    idAttribute: 'source',

    defaults: {
      source: '',
      media$group: {
        media$thumbnail: [
          { url: '' }
        ],
        media$description: {
          $t: ''
        }
      },
      title: {
        $t: ''
      },
      author: [
        { name: { $t: '' } }
      ],
      yt$statistics: {
        viewCount: ''
      }
    }
  });
});
