'use strict';

module.exports = function(redis, config, ss){

	var distancias = redis.createClient(config["port"], config["host"]); // ip, host

	if (config["auth"]) 
		distancias.auth(config["auth"]);

	distancias.subscribe("distanciastrafic");

	distancias.on("message", function (channel, message) {
		if (message){
			var serializejson = JSON.parse(message);
			ss.api.publish.all("distanciastrafic", serializejson);
		} else {
			ss.api.publish.all("distanciastrafic", {}); 
		}
	});
	
}