'use strict';

module.exports = function(redis, config, ss){

	var traficoIndep = redis.createClient(config["port"], config["host"]); // ip, host

	if (config["auth"]) 
		traficoIndep.auth(config["auth"]);

	traficoIndep.subscribe("trafico_avIndep");

	traficoIndep.on("message", function (channel, message) {
		if (message){
			var serializejson = JSON.parse(message);
			ss.api.publish.all('trafico_avIndep', serializejson);
		} else {
			ss.api.publish.all("distanciastrafic", {}); 
		}		
	});
}