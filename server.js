/*
 * Important note: this application is not suitable for benchmarks!
 */

var http = require('http'), 
url = require('url'),
fs = require('fs'), 
redis = require('./node_modules/redis'),
redisClient = redis.createClient(),
io = require('./node_modules/socket.io'), 
sys = require(process.binding('natives').util ? 'util' : 'sys'), 
server;
    
server = http.createServer(function(req, res){
  // your normal server code
  var path = url.parse(req.url).pathname;
  switch (path){
    case '/':
      fs.readFile(__dirname + '/hdb.htm', function(err, data){
        if (err) return send404(res);
        res.writeHead(200, {'Content-Type': path == 'json.js' ? 'text/javascript' : 'text/html'});
        res.write(data, 'utf8');
        res.end();
      });
      break;
      
    default: send404(res);
  }
}),

send404 = function(res){
  res.writeHead(404);
  res.write('404');
  res.end();
};

server.listen(3000);

// socket.io, I choose you
// simplest chat application evar
var socket = io.listen(server), 
buffer = [];
  
socket.on('connection', 
	  function(client) {
	      client.send({ buffer: buffer });
	      client.broadcast({ announcement: client.sessionId + ' connected' });
	      
	      setInterval(
		  function() {
		      redisClient.get("hdb_flat", 
				      function(err, reply) {
					  if (err) {
					      sys.puts(JSON.stringify(err));
					  }
					  else {
					      client.broadcast({announcement: reply});					  
					  }
				      });
		  }, 1000);	      
	  });

