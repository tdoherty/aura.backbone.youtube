/**
 * Search Result model
 */
define(function (require) {

  //module dependencies
  var Backbone = require('backbone');

  return Backbone.Model.extend({

    //to belong in a collection, each model must have a unique string/number id
    //the "id" property of the youtube data is an object, so we're providing an alternate
    idAttribute: 'source',

    //defaults are used for Underscore templates, which choke if a property is not found
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
