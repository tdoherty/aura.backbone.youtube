require.config({
  paths: {
    aura: 'components/aura/lib',
    jquery: 'components/jquery/jquery',
    underscore: 'components/underscore/underscore',
    text: 'components/requirejs-text/text'
  }
});

require(['aura/aura'], function (Aura) {
  'use strict';

  //region global housekeeping

  //configure underscore template settings to use mustache-style syntax, i.e. {{token}}
  _.templateSettings = {
    interpolate : /\{\{(.+?)\}\}/g,
    evaluate : /\{%(.+?)%\}/g
  };

  //endregion

  var app = new Aura({
    debug: {
      enable: true
    }
  });

  //region extensions

  //lets us create widgets with type: 'Backbone' for a little less boilerplate
  app.use('extensions/aura-backbone');
  //endregion

  //start the app and tell it to look for widgets in the body element
  var p = app.start({ widgets: 'body' });

  console.log(p.state());
  p.then(function(list) {
    console.log(list);
  });

  p.fail(function () {
    console.log('failed');
  });

  p.done(function () {
    console.log('done');
  });


});