// My SocketStream 0.3 app

var http = require('http'),
    ss = require('socketstream'),
    redis = require('redis'),
    config = require('./config.js'),
    redis_cfg = config['redis'],
    connRedis = redis.createClient(redis_cfg["port"], redis_cfg["host"]);

require('./server/routes/routes')(ss, config['routes']);

ss.session.store.use('redis');
if (redis_cfg["auth"]) 
	connRedis.auth(redis_cfg["auth"]);

ss.api.add('db', connRedis);

ss.publish.transport.use('redis', {host: redis_cfg["host"], port: redis_cfg["port"], pass: redis_cfg["auth"], db: redis_cfg["db"]});
ss.session.options.maxAge = 8640000;
ss.session.options.secret = "xxllollxxlo";

// Defino rutas segun el archivo de configuracion
ss.client.templateEngine.use(require('ss-hogan'));
ss.client.set({liveReload: false})

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env === 'production') ss.client.packAssets();

// Start web server
var server = http.Server(ss.http.middleware);
server.listen(config['app']['port'], config['app']['ip']);

// Start SocketStream
ss.start(server);

process.on('uncaughtException', function (err) {
	console.error('Exception caught: ', err);
});