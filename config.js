module.exports = {
	"app": {
		"name": "dashboardcivico",
		"ip": process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0",
		"port": process.env.OPENSHIFT_NODEJS_PORT || 8000
	}, 
	"redis": {
		"host": process.env.OPENSHIFT_REDIS_HOST || "127.0.0.1", // 10.200.183.128
		"port": process.env.OPENSHIFT_REDIS_PORT || 6379,
		"auth": process.env.REDIS_PASSWORD || "",
		"db": process.env.OPENSHIFT_REDIS_DB_NAME || 0
	}, "routes" : [
    {
      "name": "main",
      "path": "/",
      "widgets": ["epa"],
      "view" : "app.html",
      "css": ["libs/reset.css","app.css"],
      "code" : ["libs/jquery.min.js", "libs/odometer.min.js", "libs/bootstrap.min.js", "app"]
    }
  ]
};