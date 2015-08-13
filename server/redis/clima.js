'use strict';

module.exports = function(redis, config, ss){

	var clima = redis.createClient(config["port"], config["host"]);

	if (config["auth"]) 
		clima.auth(config["auth"]);

	clima.subscribe("estadoclima");

	clima.on('message', function (channel, message){
		if (message){
			var serializejson = JSON.parse(message);
			ss.api.publish.all("estadoclima", serializejson);
		} else {
			ss.api.publish.all("estadoclima", {}); 
		}
	});	

}