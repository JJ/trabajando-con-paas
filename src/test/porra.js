var assert = require("assert"),
apuesta = require(__dirname+"/../Apuesta.js"),
porra = require(__dirname+"/../Porra.js");

var esta_porra = new porra.Porra( "Marajena", "Gualchos", "Provincial", "2014");
describe('Apuesta', function(){
    // Testea que se haya cargado bien la librería
    describe('Carga', function(){
	it('should be loaded', function(){
	    assert(apuesta, "Cargado");
	});
	
    });
    describe('Crea', function(){
	it('should create apuestas correctly', function(){
	    var nueva_apuesta = new apuesta.Apuesta(esta_porra, 'Polopos','Alhama','2-3');
	    assert.equal(nueva_apuesta.as_string(), "Polopos: Alhama - 2-3","Creado");
	});
    });
});
