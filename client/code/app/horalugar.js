function displayCurrentTime() {
	var now = new Date();
	var separador = ":";

	// si el segundo es impar el separador es " " sino es ":";
	if (now.getSeconds() % 2 == 0) {
		separador = " ";
	}else{
		separador = ":";
	}

	var result = extraCerosHora(now.getHours(),2) + separador + extraCerosHora(now.getMinutes(),2) ;
	var html = ss.tmpl['widgets-horalugar'].render({
		hora: result
	});

    return $("#horalugar").html(html);
}

window.setInterval(function(){
	displayCurrentTime();	
}, 1000);


// Agrega ceros a la izquierda de un Int
// @param: num - Integer a agregar ceros
// @param: cant - cantidad de posiciones
// 
// input: extraCeros(3,2)
// output: "03"
function extraCerosHora( num , cant ){
	return ("0" + num).slice(-cant);
}
