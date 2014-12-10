#!/usr/bin/env node

var express=require('express');
var app = express();
var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
    res.send( { Portada: true } );
});

app.get('/proc', function (req, res) {
	res.send( { Portada: false} );
});  

app.listen(port); 
console.log('Server running at http://127.0.0.1:'+port+'/');
