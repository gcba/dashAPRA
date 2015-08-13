'use strict';

module.exports = function(redis, config, ss){

	var twitter = redis.createClient(config["port"], config["host"]); // ip, host

	if (config["auth"]) 
		twitter.auth(config["auth"]);

	twitter.subscribe("ultimos_tweets");

	twitter.on('message', function (channel, message){
		if (message){
			var serializejson = JSON.parse(message);
			ss.api.publish.all("ultimos_tweets", serializejson);
		} else {
			ss.api.publish.all("ultimos_tweets", {}); 
		}
	});

}