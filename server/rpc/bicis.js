var listbicis = require('./bicis.json');
var gdistance = require('google-distance');
var geolib = require('geolib');
var q = require('q');
var config = require('../../config.js')['redis'];
var client = require('redis').createClient(config["port"], config["host"]);

if (config["auth"]) 
  client.auth(config["auth"]);

var orderByDistance = function(distance, index){
  var listindex = []
  var result = geolib.orderByDistance({latitude: distance.latitude, longitude: distance.longitude}, listbicis)
  for (var i = 0; i<result.length;i++){
    if (i === index) { break; }
    listindex.push(result[i])
  }
  return listindex
}

var hgetall = function(distance, check, client){
  return q.Promise(function(resolve, reject, notify){
    var values = orderByDistance(distance, 6)
    client.multi([
        ["hgetall", "estacion:"+listbicis[values[0].key].id],
        ["hgetall", "estacion:"+listbicis[values[1].key].id],
        ["hgetall", "estacion:"+listbicis[values[2].key].id],
        ["hgetall", "estacion:"+listbicis[values[3].key].id],
        ["hgetall", "estacion:"+listbicis[values[4].key].id],
        ["hgetall", "estacion:"+listbicis[values[5].key].id]
    ]).exec(function (err, estaciones) {
      var iterestaciones = []
      for(var n=0;n<estaciones.length;n++)
        if(parseInt(estaciones[n].BicicletaDisponibles) >= check) iterestaciones.push(estaciones[n])
      if(err)
        reject(err);
      resolve(iterestaciones);
    });
  });
};

exports.actions = function(req, res, ss) {
  return {

    calDistance : function(distance){
      hgetall(distance, 3, client)
      .done(function(result){
        ss.miestacion = listbicis[result[0].Id]
        ss.publish.all('estacionbici', result[0]);
      }, function(err){
        if(err) console.log(err)
      });
    },

    misEstaciones: function(){
      var distance = {"latitude" : ss.miestacion.latitude, "longitude": ss.miestacion.longitude}
      hgetall(distance, 2, client)
      .done(function(result){
        ss.publish.all('cercanas_amiestacion', result);
      }, function(err){
        if(err) console.log(err)
      });
    }

  }
}