'use strict';

module.exports = function(redis, config, ss){

	var ausatrafico = redis.createClient(config["port"], config["host"]); // ip, host

	if (config["auth"]) 
		ausatrafico.auth(config["auth"]);

	ausatrafico.subscribe("estadotrafico");

	ausatrafico.on('message', function (channel, message){
		if (message){
			var serializejson = JSON.parse(message);
			ss.api.publish.all("estadotrafico", serializejson);
		} else {
			ss.api.publish.all("estadotrafico", {}); 
		}
	});

}