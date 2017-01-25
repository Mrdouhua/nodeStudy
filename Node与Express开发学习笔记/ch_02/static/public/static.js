var http = require('http'),
	fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode) {
	if(!responseCode) {
		responseCode = 200;
	}
	fs.readFile(__dirname + path, function(err, data) {
		if(err) {
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end('500 - error!!!!!');
		} else {
			res.writeHead(responseCode, { 'Content-Type': contentType });
			res.end(data);
		}
	});
}

http.createServer(function(req,res){
	var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
	switch(path) {
		case '':
				serveStaticFile(res, '/home.html', 'text/html');
				break;
		case '/about':
				serveStaticFile(res, '/about.html', 'text/html');
				break;
		case '/img/logo.png':
				serveStaticFile(res, '/img/logo.png', 'image/png');
				break;
		default:
				serveStaticFile(res, '/notfound.html', 'text/html', 404);
				break;
	}
}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-C to terminate........');