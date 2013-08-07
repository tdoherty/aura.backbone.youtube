require.config({
  paths: {
    aura: 'bower_components/aura/lib',
    jquery: 'bower_components/jquery/jquery',
    underscore: 'bower_components/underscore/underscore',
    text: 'bower_components/requirejs-text/text',
    modelBinder: 'bower_components/Backbone.ModelBinder/Backbone.ModelBinder'
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

  //lets us create aura_components with type: 'Backbone' for a little less boilerplate
  app.use('extensions/aura-backbone');
  //endregion

  //start the app and tell it to look for aura_components in the body element
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