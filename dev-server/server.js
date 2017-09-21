var express = require('express');
var serveStatic = require('serve-static');

var app = express();
app.use(serveStatic(__dirname + '/../bin'));

module.exports = app;
