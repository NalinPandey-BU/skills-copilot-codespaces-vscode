// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var path = require('path');
var comments = require('./comments.js');
var mime = require('mime');

// Create server
var server = http.createServer(function(request, response){
	var pathName = url.parse(request.url).pathname;
	var extName = path.extname(pathName);
	var mimeType = mime.lookup(pathName);
	
	if(extName){
		fs.readFile(__dirname + pathName, function(error, data){
			response.writeHead(200, {'Content-Type': mimeType});
			response.write(data);
			response.end();
		});
	}else{
		if(pathName === '/'){
			pathName = '/index.html';
		}
		fs.readFile(__dirname + pathName, function(error, data){
			response.writeHead(200, {'Content-Type': mimeType});
			response.write(data);
			response.end();
		});
	}
});

// Start server
server.listen(3000, function(){
	console.log('Server running at http://localhost:3000');
});
