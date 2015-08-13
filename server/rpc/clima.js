//'use strict';
// Server-side Code

exports.actions = function(req, res, ss) {
  
  // Example of pre-loading sessions into req.session using internal middleware
	req.use('session');

	return {

		detallado: function() {
			ss.db.hgetall('CLIMAWIDGETMAX', function(err, result){
				if (result){
					ss.publish.all('clima_detallado', JSON.parse(result['clima']))
				} else {
					ss.publish.all('clima_detallado', {'clima':[]})
				}
			});
		}

	}

}