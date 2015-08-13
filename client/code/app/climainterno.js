'use strict';

ss.event.on('climainterno', function(message) {
	var html = ss.tmpl['widgets-climaInterno'].render({
    	clima: message
	});
	return $("#climaInterno").html(html);
});