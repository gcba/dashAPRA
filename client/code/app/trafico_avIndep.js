'use strict';

ss.event.on('trafico_avIndep', function(message){
  console.log(message);

  var html = ss.tmpl['widgets-trafico_avIndep'].render();
  $("#trafico_avIndep").html(html);


  // Armar la lista de tramos de Independencia
  var i;
  for (i = 0; i < message.length; i++) {
    var clase = "white";


    if ($.inArray(message[i].esquina, ["Paseo Colón", "Perú", "Tacuarí"]) >= 0) {
      switch (message[i].estado) {
        case "2":
          clase = "green";
          break;
        case "3":
          clase = "yellow";
          break;
        case "4":
          clase = "red";
          break;  
      }

      $('.lista_independencia').append(ss.tmpl['model-independencia'].render({esquina: message[i], clase: clase}));

    }
  }
});