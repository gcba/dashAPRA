var config = require('../../config.js')['redis'];
var client = require('redis').createClient(config["port"], config["host"]);

if (config["auth"]) 
  client.auth(config["auth"]);

// Define actions which can be called from the client using ss.rpc('demo.ACTIONNAME', param1, param2...)
exports.actions = function(req, res, ss) {
  
  // Example of pre-loading sessions into req.session using internal middleware
  req.use('session');

  return {

  	getDistancias: function(){
      client.hgetall('distanciastrafic', function(err, object) {
        var serializejson = JSON.parse(object["distanciastrafic"])
        ss.publish.all('distanciastrafic', serializejson)
      });      
    }
  }
};