'use strict';

var routes = require('../../config.js')['routes'];
var config = require('../../config.js')['redis'];
var redis = require('redis');

module.exports = function(path, ss){


    if (path == "/"){
		
		for (var n=0;n<routes[0]["widgets"].length;n++){
			var service = "./"+routes[0]["widgets"][n];
			try {
				console.log(service)
				require(service)(redis, config, ss);
			} catch(exception){
				continue
			}
		}
    }

    for (var i=1;i<routes.length;i++){
	    if (path == routes[i]['path']){
			for (var n=0;n<routes[i]["widgets"].length;n++){
				var service = "./"+routes[i]["widgets"][n];
				try {
					console.log(service)
					require(service)(redis, config, ss);
				} catch(exception){
					continue
				}
			}
	    }
    }

}