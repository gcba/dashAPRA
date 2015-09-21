'use strict';
// This file automatically gets called first by SocketStream and must always exist

// Make 'ss' available to all modules and the browser console
window.ss = require('socketstream');

ss.server.on('disconnect', function(){
    console.log('Connection down');
});

ss.server.on('reconnect', function(){
    console.log('Connection back up');
});

var config = [
    {
        "name": "main",
        "path": "/",
        "widgets": [
            "/epa"
        ]
    },
    {
        "name": "plazalezama",
        "path": "/plazalezama",
        "widgets": []
    }
];

var getGeo = function(cb){
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var result = {"latitude" : position.coords.latitude, "longitude": position.coords.longitude}
            cb(result)
        })
    }
};

ss.server.on('ready', function(){

    var pathname = window.location.pathname;
    // Wait for the DOM to finish loading
    jQuery(function(){

        for (var i = 0;i<config.length;i++){

            if (pathname == config[i].path){

                getGeo(function(result){
                    if (result)
                        console.log(result);
                    ss.rpc('bicis.calDistance', result);
                    // setTimeout(function() {
                    //   ss.rpc('bicis.miEstacion')
                    // }, 1000);
                });

                for (var n=0;n<config[i]["widgets"].length;n++){
                    require(config[i]["widgets"][n]);
                }

            }

        }

    });

});
