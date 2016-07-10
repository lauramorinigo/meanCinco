var http = require('http'),
	fs   = require('fs');

http.createServer(function(req,res){
	fs.readfile("./index.html", function(err,html){
		var nombre = "Dev Rock";
		res.writeHead(200, {"Content-Type":"text/html"});
		res.write(html);
		res.end();
	});
}).listen(8080)	