'use strict';
ss.event.on('estadoclima', function(message) {
	var clima_externo = message;
console.log (clima_externo);
	clima_externo.temperatura = clima_externo.temperatura.toFixed(1);
  clima_externo.temperaturaMax = clima_externo.temperaturaMax.toFixed(1);
  clima_externo.temperaturaMin = clima_externo.temperaturaMin.toFixed(1);
  clima_externo.cielo = clima_externo.cielo.toLowerCase().replace(/\s/g,"");

	var html = ss.tmpl['widgets-clima'].render({
    	clima: clima_externo
	});
	return $("#climaExterno").html(html);
});

ss.event.on('clima_detallado', function(message) {

  var html = ss.tmpl['widgets-clima'].render({
    clima: message
  });
  
  return $("#climaDetallado").html(html);  
});