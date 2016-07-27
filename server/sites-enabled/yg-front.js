var path = require('path');
var express = require('express');
var app = express();
var router = express.Router();
var cors = require('cors');

app.get([
  '/',
  '/promotion/shop/:item',
  '/promotion/music/:item',
  '/promotion/tour/:item',
  '/promotion/event/:item',
  '/promotion/blog/:item',
  '/shop',
  '/shop/:item',
  '/music',
  '/music/:item',
  '/tour',
  '/tour/:item',
  '/event',
  '/event/:item',
  '/blog',
  '/blog/:item',
  '/artist/:name',
  '/artist/:name/shop/:item',
  '/artist/:name/music/:item',
  '/artist/:name/tour/:item',
  '/artist/:name/event/:item',
  '/artist/:name/blog/:item'
], function(req, res){
  res.sendFile(path.resolve('../public/index-server.html'));
});

app.get([
  '/api/getArtists'
], function(req, res){
  res.sendFile(path.resolve('../data/getArtists.json'));
});

app.post([
  '/api/newsletterSignup'
], function(req, res){
  setTimeout(function(){
    var user = req.params.email;
    switch(Math.floor(Math.random() * 2)){
      case 0:
        res.status(200).json({"msg": "subscribing", "email":user});
        break;
      case 1:
        res.status(409).json({"msg": "already subscribed", "email":user});
        break;
    }
  }, 500);
 /* var user = req.params.email;
  switch(Math.floor(Math.random() * 2)){
    case 0:
      res.status(200).json({"msg": "subscribing", "email":user});
      break;
    case 1:
      res.status(409).json({"msg": "already subscribed", "email":user});
      break;
  }*/
});

app.get([
  '/about'
], function(req, res){
  res.sendFile(path.resolve('../public/index-server-about.html'))
});


app.use(cors());
app.use('/', express.static(path.resolve('../public')));
app.use(router);

exports.app = app;
exports.domain = 'ygfront.local';