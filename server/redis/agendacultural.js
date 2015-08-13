'use strict';

module.exports = function(redis, config, ss){
	
	var agendacultural = redis.createClient(config["port"], config["host"]);

	if (config["auth"]) 
		agendacultural.auth(config["auth"]);

	agendacultural.subscribe("eventos_hoy");

	agendacultural.on('message', function (channel, message){
		if (message){
			var serializejson = JSON.parse(message);
			ss.api.publish.all("eventos_hoy", serializejson);
		} else {
			ss.api.publish.all("eventos_hoy", {}); 
		}
	})	


}