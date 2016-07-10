var http = require('http'),
	fs   = require('fs');

http.createServer(function(req,res){

//  console.log(req);

//Si encuentra en la url favicon hace el return
	if(req.url.indexOf("favicon.ico")>0){ return ; }

//Comienzo a leer
	fs.readFile("./index.html", function(err,html){

		var html_string = html.toString();
    var arreglo_parametros = [];
    var parametros ={};
    //Busco las variables en html_string ej {{nombre}}
		var variables = html_string.match(/[^\{\}]+(?=\})/g);
		var nombre = "";

    //Separo Parametros, los parametros en la url se separan con '?', sus valores con '&'
		if(req.url.indexOf("?")>0){
			var url_data = req.url.split("?");
			var arreglo_parametros = url_data[1].split("&");
		}

    //Recorro parametros y sus valores - dato=valor

		for(var i = arreglo_parametros.length -1; i>=0; i--){
			var parametro = arreglo_parametros[i];
			var param_data = parametro.split("=");
      //[data, valor]
			parametros[param_data[0]] = param_data[1];

		}

    //rearma el html

  	for(var i= variables.length -1; i>=0; i--){
			var variable = variables[i];
			html_string = html_string.replace("{"+variables[i]+"}", parametros[variables[i]]);
		}



		res.writeHead(200, {"Content-Type":"text/html"});
		res.write(html_string);
		res.end();
	});

}).listen(8080)
