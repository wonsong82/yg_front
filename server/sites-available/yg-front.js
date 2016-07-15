var path = require('path');
var express = require('express');
var app = express();
var router = express.Router();


var routes = {

  ['/']:
    '../public/index-server.html',

  ['/api/getArtists']:
    '../data/contents.json'

};





var reactRoutes = ['/', '/about', '/works', '/works/:work'];
app.get(reactRoutes, function(req, res){
  res.sendFile(path.resolve('../public/index-server.html'));
});

app.get('/api/getContents', function(req, res){
  res.sendFile(path.resolve('../data/contents.json'));
});


app.use('/', express.static(path.resolve('../public')));


app.use(router);
exports.app = app;

