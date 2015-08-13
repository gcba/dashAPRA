'use strict';

var estacionesARR = [];

ss.event.on('cercanas_amiestacion', function(message){
  console.log("cercanas_amiestacion:" , message)

  var html = ss.tmpl['widgets-estacionbici'].render({
    estaciones: message
  });

  //estaciones.push(message);
  if (estacionesARR.length === 10){
    return $("#estacionbici").html(html);    
  }

})

ss.event.on('estacionbici', function(message){
  
  console.log("estacionbici:" , message)

   var html = ss.tmpl['widgets-estacionbici'].render({
     estacion: message
   });
  
   return $("#estacionbici").html(html);

});

window.setInterval(function(){
  traigoEstaciones();
}, 60000);

/* funciones para invovcar si el widget esta presente */

// pide todas las estaciones.
function traigoEstaciones(){
  ss.rpc("bicis.misEstaciones");
}
