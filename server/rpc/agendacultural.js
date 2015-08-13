'use strict';

exports.actions = function(req, res, ss) {
 
  	req.use('session');

	return {
		eventosProximos : function(){
			ss.db.get('length_eventos', function(e, total_eventos){
				for (var id=0;id<total_eventos;id++){
					ss.db.hgetall('evento:'+id, function(err, evento){
						if (evento)
							ss.publish.all('eventos_proximos', evento)
					});
				}
			})
		}
	}

}