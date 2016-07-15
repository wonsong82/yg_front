var path = require('path');
var express = require('express');
var app = express();
var router = express.Router();
var cors = require('cors');

app.get([
  '/',
  '/blog',
  '/event',
  '/tour',
  '/shop',
  '/music',
  '/artist/:name'
], function(req, res){
  res.sendFile(path.resolve('../public/index-server.html'));
});

app.get([
  '/api/getArtists'
], function(req, res){
  res.sendFile(path.resolve('../data/getArtists.json'));
});


app.use(cors());
app.use('/', express.static(path.resolve('../public')));
app.use(router);

exports.app = app;
exports.domain = 'ygfront.local';
