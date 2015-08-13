'use strict';

module.exports = function(redis, config, ss){
	
	var climainterno = redis.createClient(config["port"], config["host"]);

	if (config["auth"]) 
		climainterno.auth(config["auth"]);

	climainterno.subscribe("climainterno");

	climainterno.on('message', function (channel, message){
		if (message){
			ss.api.publish.all("climainterno", message);
		} else {
			ss.api.publish.all("climainterno", '0'); 
		}
	})	


}