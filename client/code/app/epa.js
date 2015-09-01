'use strict';

ss.event.on('epa_minutal', function(message) {
    var epa_data = JSON.parse(message.replace(/'/g, '"'));
    console.log(epa_data);
    var html = ss.tmpl['widgets-epa'].render(epa_data);
    return $("#epa").html(html);
});

