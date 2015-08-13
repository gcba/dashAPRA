var config = require('../../config.js')['redis'];
var client = require('redis').createClient(config["port"], config["host"]);

if (config["auth"]) 
  client.auth(config["auth"]);

exports.actions = function(req, res, ss) {
  return {
    getCo2 : function(){
      client.hgetall('co2', function(err, object) {
        ss.publish.all('co2', object["co2"])
      });      
    }
  }
}