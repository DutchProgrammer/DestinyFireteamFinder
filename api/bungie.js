//185.10.50.140:9006

var express     = require('express');
var app         = express();
var server      = require('http').createServer(app);
var serverPort  = 9006;
var io          = require('socket.io')(server);
var MongoClient = require('mongodb').MongoClient;
var assert      = require('assert');



// Connection URL
var url = 'mongodb://localhost:27017/';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

	server.listen(serverPort);


	io.on('connection', function (socket) {

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
		
		
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('<html><body>test</body><html>');
		res.end();
	});


	console.log('server is running on '+serverPort);

  db.close();
});