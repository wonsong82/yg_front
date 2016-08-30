var ENV = require('../../env');

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
  if(ENV.Env == 'development')
    res.sendFile(path.resolve('../public/index-server.html'));
  else
    res.sendFile(path.resolve('../public/index.html'));
});

app.get([
  '/api/getAlbums'
], function (req, res) {
  res.sendFile(path.resolve('../data/getAlbums.json'));
});

app.get([
  '/api/getArtists'
], function(req, res){
  res.sendFile(path.resolve('../data/getArtists.json'));
});

app.get([
  '/api/getTours'
], function (req, res) {
 res.sendFile(path.resolve('../data/getTours.json'));
});

app.get([
  '/api/getEvents'
], function (req, res) {
  res.sendFile(path.resolve('../data/getEvents.json'));
});

app.get([
  '/api/getBlogs'
], function (req, res) {
  res.sendFile(path.resolve('../data/getBlogs.json'));
});



app.get([
  '/api/getMusics'
], function (req, res) {
  res.sendFile(path.resolve('../data/getMusics.json'));
});

app.get([
  '/api/getShops'
], function (req, res) {
  res.sendFile(path.resolve('../data/getShops.json'));
});

app.get([
  '/api/getPromotions'
], function (req, res) {
  res.sendFile(path.resolve('../data/getPromotions.json'));
});

app.get([
  '/api/getHotBlogs'
], function (req, res) {
  res.sendFile(path.resolve('../data/getHotBlogs.json'));
});

app.get([
  '/api/getProductsInCart'
], function (req, res) {
  res.sendFile(path.resolve('../data/getCarts.json'));
});

app.get([
  '/api/getSocialFeeds'
], function (req, res) {
  res.sendFile(path.resolve('../data/getSocialFeeds.json'));
});





app.post([
  '/api/newsletterSignup'
], function(req, res){
  setTimeout(function(){
    var user = req.params.email;
    switch(Math.floor(Math.random() * 3)){
      case 0:
        res.status(200).json({"msg": "subscribing", "email":user});
        break;
      case 1:
        res.status(409).json({"msg": "already subscribed", "email":user});
        break;
      case 2:
        res.status(400).json({"msg": "bad email format", "email":user});
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

app.post([
  '/api/addProductsToCart'
], function(req, res){
  setTimeout(function(){
    console.log('server')
    switch(Math.floor(Math.random() * 3)){
      case 0:
        res.status(200).json({"msg": "adding"});;
        break;
      case 1:
        res.status(409).json({"msg": "adding"});;
        break;
      case 2:
        res.status(400).json({"msg": "adding"});;
    }
  }, 500);
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
exports.domain = ENV.Domain;
