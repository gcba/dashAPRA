'use strict';

ss.event.on('estadotrafico', function(message){
  console.log(message);

  var html = ss.tmpl['widgets-ausatrafico'].render();
  $("#ausa").html(html);

  // Armar la lista de tramos de AUSA
  var i;
  for (i = 0; i < message.length; i++) {
    var clase = "white";
    switch (message[i].estado) {
   		case "008000":
   			clase = "green";
   			break;
   		case "FFFF00":
   			clase = "yellow";
   			break;
   		case "FF0000":
   			clase = "red";
   			break;	
    }

    $('.lista_ausa').append(ss.tmpl['model-ausa'].render({tramo: message[i], clase: clase}));
  }
});

ss.event.on('disconnect', function(){
  console.log("disconnect ausatrafic")
});