'use strict';

module.exports = function(redis, config, ss){

	var subtes = redis.createClient(config["port"], config["host"]); // ip, host

	if (config["auth"]) 
		subtes.auth(config["auth"]);

	subtes.subscribe("estadosubtes");

	subtes.on('message', function (channel, message){
		if (message){			
			var serializejson = JSON.parse(message);
			ss.api.publish.all("estadosubtes", serializejson);
		} else {
			ss.api.publish.all("estadosubtes", {}); 
		}
	});
}