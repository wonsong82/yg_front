var
  glob = require('glob'),
  path = require('path'),
  express = require('express'),
  vhost = require('vhost'),
  cors = require('cors'),
  server = express();


server.use(cors());


glob.sync('./sites-enabled/*.js').forEach(function(file){
  var site = require(path.resolve(file));
  server.use(vhost(site.domain, site.app));
  console.log('Express serving "' + site.domain + '" at port:80');
});

server.listen(80);


/*


var server = express();
server.use(vhost('ygfront.local', require('./sites/yg-front').app))
  .listen(80);



console.log('Express server started on port 80');

*/



