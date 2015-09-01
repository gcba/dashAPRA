'use strict';

module.exports = function(redis, config, ss){
    var epa_client = redis.createClient(config["port"], config["host"]);
    epa_client.subscribe("epa_minutal");
    epa_client.on('message', function (channel, message){
        ss.api.publish.all("epa_minutal", message);
    });
};
