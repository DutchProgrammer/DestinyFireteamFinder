//185.10.50.140:9006

var express    = require('express');
var app        = express();
var server     = require('http').createServer(app);
var serverPort = 9006;
var io         = require('socket.io')(server);
var $          = require('jquery');



server.listen(serverPort);


io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

app.get('*', function (req, res) {
	var url = (req.url === '/' ? '/' : req.url);
	url = url.split('?')[0];

	console.info(url, 'url');

	//Dont let them read this file !!
	if (url === '/bungie.js') {
		res.writeHead(404, {'Content-Type': 'text/html'});
		res.write('404 file not found');
		res.end();
		return;
	}
	
	console.info($('<html><body>test</body><html>').length, 'test');
	
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<html><body>test</body><html>');
	res.end();

});


console.log('server is running on '+serverPort);