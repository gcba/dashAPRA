'use strict';

ss.event.on('distanciastrafic', function(message){

	console.log(message)
	var html = ss.tmpl['widgets-distancias'].render({
    	constitucion: message.constitucion,
    	pte_savedra: message.pte_savedra,
    	retiro: message.retiro
	});

	return $("#distancias").html(html);
});

