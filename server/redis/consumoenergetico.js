'use strict';

module.exports = function(redis, config, ss){

	var consumoenergetico = redis.createClient(config["port"], config["host"]); // ip, host

	if (config["auth"]) 
		consumoenergetico.auth(config["auth"]);

	consumoenergetico.subscribe("consumoenergetico");

	consumoenergetico.on("message", function (channel, message) {
		if (message){
			var serializejson = JSON.parse(message);
			ss.api.publish.all("consumoenergetico", serializejson);
		} else {
			ss.api.publish.all("consumoenergetico", {}); 
		}
	});
}