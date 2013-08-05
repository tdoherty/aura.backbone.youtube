/**
 * RequireJS Module Definition - AMD 'sugar' syntax
 */
define(function (require) {

  //module dependencies
  var Backbone = require('backbone');

  function getDuration(seconds) {
    minutes = parseInt(seconds / 60, 10);
    seconds = '' + (seconds % 60);
    if (seconds.length === 1) {
      seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
  }

  return Backbone.Model.extend({

    idAttribute: 'source',

    defaults: {
      source: '',
      title: {
        $t: ''
      }
    },

    videoSource: '',

    url: function () {
      return 'http://gdata.youtube.com/feeds/videos/' + this.videoSource + '?format=5&alt=json-in-script';
    },

    fetch: function (options) {
      var self = this,
        opts = _.extend({}, options || {});

      opts.dataType = 'jsonp';
      Backbone.Model.prototype.fetch.call(this, opts)
    },

    parse: function (response) {

      var data = response.entry;
      var paths = data.id.$t.split('/');
      data.source = paths[paths.length - 1];
      data.duration = getDuration(data.media$group.yt$duration.seconds);

      return data;
    }

  });

});
