'use strict';

ss.event.on('eventos_hoy', function(message) {
  var html = ss.tmpl['widgets-agendacultural'].render();
  $("#agenda").html(html);  

  var i;
  for (i = 0; i < message.length; i++) {
    console.log(message[i]);
    $('#lista_agenda').append(ss.tmpl['model-evento'].render({evento: message[i]}));
  }
  console.log(message)
});

ss.event.on('eventos_proximos', function(message) {
  console.log(message)
});