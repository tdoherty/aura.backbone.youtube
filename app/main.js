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

  var app = new Aura({
    debug: {
      enable: true
    }
  });

  /*
  Add your extensions here.
   */
  app.use('extensions/aura-backbone');
  app.use('extensions/aura-backbone.layoutmanager');
//  app.permissions

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

//  debugger;
//  app.core.Widgets.load('home', {
//    el: '#test'
//  });
});