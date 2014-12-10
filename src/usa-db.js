#!/usr/bin/env node

var db_file = process.env.argv[2] || "porrio.db.sqlite3";
var apuesta = require("../Apuesta.js");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(apuesta);

console.log(apuesta);
var nueva_apuesta = new apuesta.Apuesta('Polopos','Alhama','2-3');
console.log(nueva_apuesta);
console.log(nueva_apuesta.as_string());
