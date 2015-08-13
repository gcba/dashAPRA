'use strict';

exports.actions = function(req, res, ss) {

	req.use('session');

	return {
		calcularPromedios : function(){
			var hora_actual = new Date().getHours();
			
			// Claves de borneras
			var key_luces = "luz:" + hora_actual;
			var key_tomas = "corrientes:" + hora_actual;
			var key_aires = "aire:" + hora_actual;

			var promedios = {};

			// Seteo flags porque no sabemos cual callback va a llegar primero. 
			// Una vez terminados los 3 calls podemos mandar el resultado al front.
			var flag_luces, flag_tomas, flag_aires = false;

			// Ir a buscar a Redis el promedio de luces
			ss.db.get(key_luces, function(error, luces) {
				flag_luces = true;
				promedios.luces = luces;
				if (flag_luces && flag_tomas && flag_aires) {
					res(promedios);
				}
			});
			// Ir a buscar a Redis el promedio de tomas
			ss.db.get(key_tomas, function(error, tomas) {
				flag_tomas = true;
				promedios.tomas = tomas;
				if (flag_luces && flag_tomas && flag_aires) {
					res(promedios);
				}
			});
			// Ir a buscar a Redis el promedio de aires
			ss.db.get(key_aires, function(error, aires) {
				flag_aires = true;
				promedios.aires = aires;
				if (flag_luces && flag_tomas && flag_aires) {
					res(promedios);
				}
			});
		}  	
	}
}