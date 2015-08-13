'use strict';

ss.event.on('ultimos_tweets', function(message){
  var html = ss.tmpl['widgets-twitter'].render();
  $("#ultimos_tweets").html(html);  

  var i;
  for (i = 0; i < message.length; i++) {
    $('#lista_tweets').append(ss.tmpl['model-tweet'].render({tweet: message[i]}));
  }
})