'use strict';

module.exports = function(redis, config, ss){

	var co2 = redis.createClient(config["port"], config["host"]); // ip, host

	if (config["auth"]) 
		co2.auth(config["auth"]);

	co2.subscribe("co2");

	co2.on('message', function (channel, message){
		if (message){
			ss.api.publish.all("co2", message);
		} else {
			ss.api.publish.all("co2", 0); 
		}
	});
}