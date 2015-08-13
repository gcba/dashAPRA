'use strict';

ss.event.on('co2', function(message){
  var html = ss.tmpl['widgets-co2'].render({
  	co2: message
  });
  $("#calidadAire").html(html);  
})