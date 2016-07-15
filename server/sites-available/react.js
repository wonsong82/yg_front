var path = require('path');
var express = require('express');
var app = express();
var router = express.Router();

var PUBLIC_PATH = path.resolve('../public');


var reactRoutes = ['/', '/about', '/works', '/works/:work'];
app.get(reactRoutes, function(req, res){
  res.sendFile(path.resolve(PUBLIC_PATH, 'index-server.html'));
});

app.get('/api/getContents', function(req, res){
  res.sendFile(path.resolve('../data/contents.json'));
});


app.use('/', express.static(PUBLIC_PATH));


app.use(router);
exports.app = app;

