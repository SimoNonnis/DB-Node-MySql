'use strict';

var express = require('express');
var app = express();
var connection = require('./db');






// Root
app.get('/', function (req, res) {
  res.status(200).send('hello world');
});

// Basic 404 handler
app.use(function (req, res) {
  res.status(404).send('404! Not Found');
});

// Basic error handler
app.use(function (err, req, res, next) {
  console.error(err);

  res.status(500).send(err.response || 'Oooh! Something broke!');
});



var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Up and running at http://%s:%s', host, port);
});
