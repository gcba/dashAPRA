'use strict';

module.exports = function(ss, config){
 
  ss.client.define('main', {
    view: config[0]['view'],
    css:  config[0]['css'],
    code: config[0]['code'],
    tmpl: ['*']
  });

  ss.http.route("/", function(req, res){
    require('../redis/poll_conn')("/", ss);
    res.serveClient("main");
  });

  for (var i = 1; i<config.length; i++){

    var routes = config[i];
     
    ss.client.define(routes['name'], {
      view: routes['view'],
      css:  routes['css'],
      code: routes['code'],
      tmpl: '*'
    });

    ss.http.router.on(routes['path'], function(req, res){
      require('../redis/poll_conn')(routes['path'], ss);
      res.serveClient(routes['name']);
    })

  }

}