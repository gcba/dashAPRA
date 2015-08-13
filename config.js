module.exports = {
	"app": {
		"name": "dashboardcivico",
		"ip": process.env.VM_NODEJS_IP || "127.0.0.1",
		"port": process.env.VM_NODEJS_PORT || 8080
	}, 
	"redis": {
		"host": process.env.VM_REDIS_HOST || "127.0.0.1", // 10.200.183.128
		"port": process.env.VM_EXTREDIS_DB_PORT || 6379,
		"auth": process.env.VM_EXTREDIS_DB_PASSWORD || "",
		"db": process.env.VM_EXTREDIS_DB_NAME || 0
	}, "routes" : [
    {
      "name": "main",
      "path": "/",
      "widgets": ["consumoenergetico",
                  "clima",
                  "subtes",
                  "distancias",
                  "trafico_avIndep",
                  "co2",
                  "ausatrafico",
                  "climainterno"],
      "view" : "app.html",
      "css": ["libs/reset.css","app.min.css"],
      "code" : ["libs/jquery.min.js", "libs/odometer.min.js", "libs/bootstrap.min.js", "app"]
    },{
      "name": "plazalezama",
      "path": "/plazalezama",
      "widgets": [],
      "view": "plazalezama.html",
      "css":  ["libs/reset.css", "app.min.css"],
      "code" : ["libs/jquery.min.js", "libs/odometer.min.js", "app"]
    }
  ]
}