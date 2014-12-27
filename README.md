Trabajando con PaaS: Plataformas como servicio
===================

##Objetivos

1. Conocer herramientas de desarrollo rápido de aplicaciones web en `node`.
2. Conocer las diferentes plataformas *freemium* PaaS existentes.
3. Entender el concepto de PaaS y como se relaciona con los otros niveles de la nube.
4. Comenzar a usar un PaaS.

## Introducción

Cuando uno quiere parte del trabajo ya hecho, o al menos preparado para hacer con la pulsación de un botón, a la vez que tiene flexibilidad para trabajar con marcos de aplicaciones más allá de lo que ofrece programar *plugins* (como en el SaaS), necesita un [Platform as a Service o PaaS](http://en.wikipedia.org/wiki/Platform_as_a_service). Un PaaS proporciona una pila que incluye, generalmente, almacenamiento de datos, un marco concreto para trabajar (tal como Django o Ruby on Rails) y, adicionalmente, un servidor web.

Esto conlleva una cierta falta de flexibilidad: se pueden usar las pilas que hay y el usuario sólo puede subir su aplicación que use esa pila, no instalar elementos adicionales que necesiten permisos de superusuario. Pero, por otro lado, ofrece la comodidad de tener que concentrarse sólo en la aplicación en sí y no en la infraestructura. Es, por eso, menos *DevOps* que una solución *IaaS*, pero por otro lado también tiene una parte que es la configuración y despliegue de la aplicación en sí y los tests que se vayan a usar.

Usando un servicio PaaS
-----

La mayoría de los servicios PaaS están ligados a una pila de
soluciones determinada o a un vendedor determinado. Han surgido
muchos, por ejemplo, en torno a [node.js](http://nodejs.org), un
intérprete de JavaScript asíncrono que permite crear fácilmente
aplicaciones REST.

Algunos servicios PaaS son específicos (sólo alojan una solución
determinada, como [CloudAnt](https://cloudant.com/) que aloja una base
de datos con CouchDB o genéricos), permitiendo una serie de soluciones
en general relativamente limitada; [Heroku](http://www.heroku.com) y
[OpenShift](http://www.openshift.com) están entre estos últimos. 

> Darse de alta en algún servicio PaaS tal como Heroku, [Nodejitsu](https://www.nodejitsu.com/) u OpenShift.

Estos servicios proveen un número limitado de máquinas virtuales y
siguen en general un modelo *freemium*: capacidades básicas son
gratuitas y para conseguir mayores prestaciones o un uso más
intensivo, o bien capacidades que no entren en el paquete básico, hay
que pasar al modelo de pago. Estas máquinas virtuales se denominan
[*dynos*](https://devcenter.heroku.com/articles/dynos) en Heroku y
simplemente aplicaciones en OpenShift, aunque los *dynos* son mucho
más flexibles que las aplicaciones de OpenShift.

La interacción con los PaaS se hace en general a través de una
herramienta de línea de órdenes que permite, para empezar, crear
fácilmente a partir de una plantilla una aplicación básica con las
características definidas; en ambos casos habrá que descargar una
aplicación libre para llevar a cabo ciertas tareas como monitorizar el
estatus y hacer tests básicos; una vez creado el fuente de la
aplicación el despliegue en la máquina virtual se hace mediante
`git` tal como hemos contado anteriormente. 

Los lenguajes más habituales en las PaaS son los de scripting, que
permiten crear aplicaciones rápidamente; las bases de datos
disponibles son tanto las clásicas DBMS aunque, con más frecuencia, se
usan las bases de datos NoSQL como MongoDB, Redis o CouchDB.

En cualquier caso, los PaaS suelen tener un panel de control que
permite hacer ciertas cosas como configurar *plugins* o *add-ons*
desde la web fácilmente. Estos suelen seguir el mismo modelo freemium:
diferentes tamaños o instancias son gratuitas o tienen un coste; en
algunos casos cualquier instancia tiene un coste.

En general, el enfoque para este tipo de herramientas (y para casi
todo el desarrollo web moderno) es trabajar con servidores REST que
envíen al cliente algún tipo de información de la que este estará
encargado y plasmará. También eso facilita el desarrollo de cualquier
tipo de cliente, móvil, navegador o incluso middleware, que puede
estar incluido en la misma aplicación. Por eso haremos un pequeño
recorrido por el concepto de servicios REST, basados en los verbos del
protocolo HTTP.

## El protocolo HTTP y sus múltiples posibilidades

El protocolo [HTTP](http://es.wikipedia.org/wiki/HTTP) es uno de los
protocolos más infrautilizados de la historia. A pesar de que ofrece
múltiples posibilidades y versiones, se usa simplemente para enviar y
recibir información de un servidor. Para recibir información se usa la
orden `GET`, y para enviar, la orden `POST`. Pero también hay otras
posibilidades, `PUT` (que envía un recurso determinado al servidor),
`DELETE` (que borra un recurso del servidor) e incluso `HEAD` (igual que
`GET`, pero sin el cuerpo de la respuesta).

El protocolo [HTTP](#HTTP) gira alrededor del concepto de *recurso*: un
recurso en un servidor está identificado por un URI, y es la mínima
acción que un servidor puede realizar. Como características adicionales,
la acción de algunas peticiones (`GET` y `HEAD`) debe ser *segura*, es
decir, dejar al servidor en el mismo estado que antes de la petición.
Otras acciones, como `PUT` y `DELETE`, se denominan *idempotentes*: el
hacer varias veces la misma petición tiene el mismo efecto que el
hacerla una sola vez.

[HTTP](#HTTP) funciona puramente como cliente-servidor: se hace una
petición, y se espera la respuesta. Lo que no quiere decir que no se
puedan hacer peticiones concurrentes y asíncronas; sin embargo, esas
peticiones tendrán que estar dentro del marco de una página web (o sea,
una aplicación).

A las peticiones el servidor responde con una serie de [códigos
estándar](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes), que
usan la misma presentación que la petición: texto puro y duro. Cuando
todo va bien, la respuesta es `200 OK`; los códigos `2xx` corresponden,
en general, a una petición hecha, y fuera de los 2xx existe el caos y el
descontrol. En especial, un código 500 implica error en el servidor.
Evidentemente, estos mensajes están pensados para que los lea un cliente
en el navegador; sin embargo, cuando trabajamos directamente sobre este
protocolo, nuestro programa deberá ser consciente de ellos y responder
de forma adecuada como si se tratara de una llamada a otro
procedimiento.

Las aplicaciones construidas alrededor del protocolo HTTP y sus
características se suelen llamar [aplicaciones
RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer)
(REST == REpresentational State Transfer). La idea de REST es que se
transfiere el estado del servidor al cliente. Un recurso tiene una
representación, que se transfiere al cliente por una petición; esa
representación se puede cambiar con diferentes operaciones. Sin embargo,
con esto sólo estamos especificando la capa más baja del servicio web;
hace falta una capa de mensajería. Y esta capa de mensajería se suele
denominar [POX](http://es.wikipedia.org/wiki/POX), o *Plain Old XML*
(XML *de toda la vida*), es decir XML bien formado con algunas
ampliaciones, pero sin ningún tipo de validación. En algunos casos se
usa texto directamente, aunque también se puede usar JSON o cualquier
otro tipo de capa.

De hecho, las aplicaciones [REST suelen ser más
populares](http://www.oreillynet.com/pub/wlg/3005) que otros servicios
web, por el simple hecho de que es muy fácil construir el interfaz:
simplemente creando una cadena determinada. Eso los hace también más
rápidos, aunque sean menos flexibles.

Vamos a ver un interfaz de este tipo relativamente reciente: el de
[Twitter](http://twitter.com/), un sitio *social* que transmite a todo
el que quiera escucharlo las líneas de estado (mensajes de menos de 200
caracteres). El [API de Twitter](https://dev.twitter.com/docs) es
[RESTful](#RESTful), y está bastante bien diseñada. Para usarla es
necesario darse de alta; desde la versión 1.1 del interfaz todas las
peticiones necesitan autenticación. Así que usaremos [otro interfaz, el
de GitHub](http://developer.github.com/v3/), para hacer pruebas. Por
ejemplo, esta petición te dará todas las *organizaciones* a las que
pertenece el usuario [JJ](http://github.com/JJ):

`bash$ curl -i https://api.github.com/users/JJ/orgs`

Para llevar a cabo este ejemplo hay que instalar `curl`, un programa que
en una primera aproximación es simplemente un descargador de páginas web
pero que en segunda se puede usar como un completo cliente
[REST](#REST); en este caso `-i` te incluye las cabeceras en la salida,
con lo que producirá algo de este estilo

	HTTP/1.1 200 OK
	Server: GitHub.com
	Date: Thu, 11 Dec 2014 09:57:32 GMT
	Content-Type: application/json; charset=utf-8
	Status: 200 OK
	X-RateLimit-Limit: 60
	X-RateLimit-Remaining: 59
	X-RateLimit-Reset: 1418295452
	Cache-Control: public, max-age=60, s-maxage=60
	ETag: "4bb99f4903f3cfdd807ecd91fcab8c5b"
	Vary: Accept
	X-GitHub-Media-Type: github.v3
	X-XSS-Protection: 1; mode=block
	X-Frame-Options: deny
	Content-Security-Policy: default-src 'none'
	Content-Length: 1437
	Access-Control-Allow-Credentials: true
	Access-Control-Expose-Headers: ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval
	Access-Control-Allow-Origin: *
	X-GitHub-Request-Id: 96D6CD29:6713:5D13B3E:54896A8C
	Strict-Transport-Security: max-age=31536000; includeSubdomains; preload
	X-Content-Type-Options: nosniff
	Vary: Accept-Encoding
	X-Served-By: 2811da37fbdda4367181b328b22b2499

	[
	  {
		"login": "openkratio",
		"id": 2310256,
		"url": "https://api.github.com/orgs/openkratio",
		"repos_url": "https://api.github.com/orgs/openkratio/repos",
		"events_url": "https://api.github.com/orgs/openkratio/events",
		"members_url": "https://api.github.com/orgs/openkratio/members{/member}",
		"public_members_url": "https://api.github.com/orgs/openkratio/public_members{/member}",
		"avatar_url": "https://avatars.githubusercontent.com/u/2310256?v=3"
	  },
	  {
		"login": "CANUBE",
		"id": 3839808,
		"url": "https://api.github.com/orgs/CANUBE",
		"repos_url": "https://api.github.com/orgs/CANUBE/repos",
		"events_url": "https://api.github.com/orgs/CANUBE/events",
		"members_url": "https://api.github.com/orgs/CANUBE/members{/member}",
		"public_members_url": "https://api.github.com/orgs/CANUBE/public_members{/member}",
		"avatar_url": "https://avatars.githubusercontent.com/u/3839808?v=3"
	  },
	  {
		"login": "MusesProject",
		"id": 6651546,
		"url": "https://api.github.com/orgs/MusesProject",
		"repos_url": "https://api.github.com/orgs/MusesProject/repos",
		"events_url": "https://api.github.com/orgs/MusesProject/events",
		"members_url": "https://api.github.com/orgs/MusesProject/members{/member}",
		"public_members_url": "https://api.github.com/orgs/MusesProject/public_members{/member}",
		"avatar_url": "https://avatars.githubusercontent.com/u/6651546?v=3"
	  }
	]

La idea de [REST](#REST) desde el punto de vista del servidor es usar el
URL para representar recursos, y las propias órdenes de HTTP para
ejercitar acciones sobre ese recursos. En general, `GET` servirá para
transferir la representación de un recurso del cliente al servidor,
`POST` cambiará el estado de un recurso, `PUT` (que no se suele usar tan
a menudo) directamente cambiaría la representación del recurso, mientras
que `DELETE` borraría el recurso; a estas arquitecturas se les suele
denominar también *arquitecturas orientadas al recurso*

Por eso también se suelen proponer una serie de [buenas prácticas para
diseñar un interfaz
REST](http://en.wikipedia.org/wiki/Representational_State_Transfer#Guiding_principles_of_the_interface):

-   La funcionalidad está divida en recursos
-   Se usa una sintaxis universal basada en URL
-   Todos los recursos tienen un interfaz uniforme, con un conjunto bien
    definido de operaciones y un conjunto restringido de tipos de
    contenido. En particular, este interfaz esconde los detalles de la
    implementación.

Por ejemplo, supongamos que hay que diseñar un interfaz REST para una
quiniela deportiva. Hay una quiniela por jornada, y cada jornada tiene
15 partidos. Supongamos que se conocen los partidos de antemano, y que
sólo se pueden proponer resultados por parte de un usuario. Se podría
diseñar el interfaz de la forma siguiente:

-   Quiniela de una jornada:
    `http://jost.com/quiniela/jornada/[número de       jornada]`
-   Un partido de una quiniela:
    `http://jost.com/quiniela/jornada/[número de       jornada]/partido/[número de partido]`
-   Para los resultados, habría que sustituir `quiniela` por
    `resultados`. Adicionalmente, añadir `usuario/[nombre de usuario]`,
    para recuperar los resultados propuestos por un usuario determinado.
    Por ejemplo, Resultados:
    `http://jost.com/resultados/jornada/22/usuario/foobar`

Las operaciones HTTP que se van a usar vienen determinadas por el diseño
del interfaz. Por ejemplo, para proponer un resultado determinado habría
que hacer una petición POST con dos parámetros: el nombre de usuario y
el resultado propuesto. El servidor responderá con un mensaje estándar
HTTP y un fichero XML si se ha podido hacer correctamente, y con un
error HTTP si no.

Si se trabaja con servidores tradicionales como Apache, es
relativamente fácil crear interfaces REST con esta sintaxis para
programas tradicionales. Sin embargo, es normal que el servidor web
esté incluido en el marco de desarrollo e incluya una forma fácil de
crear estas *rutas*, que equivalen a llamadas al API en REST.


## Interfaces REST simples con express

Para diseñar interfaces REST de forma bastante simple, hay un [módulo de
node.js llamado express](http://expressjs.com/). La idea de este módulo
es reflejar en el código, de la forma más natural posible, el diseño del
interfaz REST.

Pero primero hay que instalarlo. Node.js tiene un sistema de gestión de
módulos bastante simple llamado [npm](http://npmjs.org/) que ya hemos usado. Tras seguir las instrucciones en el 
sitio para instalarlo (o, en el caso de ubuntu, instalarlo desde
Synaptic o con apt-get), vamos al directorio en el que vayamos a crear
el programa y escribimos

`npm install express --save`

en general, no hace falta tener permiso de administrador, sólo el
necesario para crear, leer y ejecutar ficheros en el directorio en el
que se esté trabajando. `--save` guarda la dependencencia en `package.json` siempre que esté en el mismo directorio, que convendría que estuviera, así no tenemos que recordar qué es lo que está instalado. 

Tras la instalación, el programa que hemos visto más arriba se
transforma en el siguiente:

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


Para empezar, `express` nos evita todas las molestias de tener que
procesar nosotros la línea de órdenes: directamente escribimos una
función para cada respuesta que queramos tener, lo que facilita mucho la
programación. Las órdenes reflejan directamente las órdenes de
HTTP a las que queremos responder, en este caso `get` y por
otro lado se pone directamente la función para cada una de ellas. Dentro
de cada función de respuesta podemos procesar las órdenes que queramos.

Por otro lado, se usa `send`  para enviar el resultado,
[una orden más flexible](http://expressjs.com/guide.html#http-methods)
que admite todo
tipo de datos que son procesados para enviar al cliente la respuesta
correcta. Tampoco hace falta establecer explícitamente el tipo MIME que
se devuelve, encargándose `send` del mismo.

En los dos casos, las peticiones devuelven JSON. Una aplicación de
este tipo puede devolver cualquier cosa, HTML o texto, pero conviene
acostumbrarse a pensar en estas aplicaciones como servidores a los
cuales se va a acceder desde un cliente, sea un programa que use un
cliente REST o sea desde el navegador usando jQuery o Javascript. 

>Realizar una aplicación básica que use `express` para devolver alguna
>estructura de datos del model que se viene usando en el curso.

Con el mismo `express` se pueden generar aplicaciones no tan básicas
ejecutándolo de la forma siguiente:

`node_modules/express/bin/express prueba-rest`

Se indica el camino completo a la aplicación binaria, que sería el
puesto. Con esto se genera un directorio prueba-rest. Cambiándoos al
mismo y escribiendo simplemente `npm install` se instalarán las
dependencias necesarias. La aplicación estará en el fichero `index.js`,
lista para funcionar, pero evidentemente habrá que adaptarla a nuestras
necesidades particulares.

El acceso a los parámetros de la llamada y la realización de diferentes
actividades según el mismo se denomina enrutado. En express se pueden
definir los parámetros de forma bastante simple, usando marcadores
precedidos por `:`. Por ejemplo, si queremos tener diferentes contadores
podríamos usar el [programa
siguiente](https://github.com/JJ/node-app-cc/blob/master/index.js):

	var express = require('express');
	var app = express();

	// recuerda ejecutar antes grunt creadb
	var db_file = "porrio.db.sqlite3";
	var apuesta = require("./Apuesta.js");
	var porra = require("./Porra.js");

	var porras = new Array;

	app.set('port', (process.env.PORT || 5000));
	app.use(express.static(__dirname + '/public'));

	app.put('/porra/:local/:visitante/:competition/:year', function( req, response ) {
		var nueva_porra = new porra.Porra(req.params.local,req.params.visitante,
						  req.params.competition, req.params.year );
		porras.push(nueva_porra);
		response.send(nueva_porra);
	});

	app.get('/porras', function(request, response) {
		response.send( porras );
	});

	app.listen(app.get('port'), function() {
	  console.log("Node app is running at localhost:" + app.get('port'));
	});



Este [programa
(express-count.js)](https://github.com/JJ/node-app-cc/blob/master/index.js)
introduce otras dos órdenes REST: PUT, que, como recordamos, sirve para
crear nuevos recurso y es idempotente (se puede usar varias veces con el
mismo resultado) y además GET. Esa orden la vamos a usar para crear
contadores a los que posteriormente accederemos con `get`. PUT no es una
orden a la que se pueda acceder desde el navegador, así que para usarla
necesitaremos hacer algo así desde la línea de órdenes:
`curl -X PUT http://127.0.0.1:8080/porra/local/visitante/Copa/2013` para lo que
previamente habrá que haber instalado `curl`, claro. Esta orden llama a
PUT sobre el programa, y crea un partido con esas características. Una
vez creado, podemos acceder a él desde la línea de órdenes o desde el
navegador; la dirección `http://127.0.0.1:8080/porras` nos devolverá
en formato JSON todo lo que hayamos almacenado hasta el momento.

## Probando nuestra aplicación en la nube

Porque esté en la nube no significa que no tengamos que testearla como cualquier hija de vecina. En este caso no vamos a usar tests unitarios, sino test funcionales (o como se llamen); de lo que se trata es que tenemos que levantar la web y que vaya todo medianamente bien.

Los tests podemos integrarlos, como es natural, en el mismo marco que el resto de la aplicación, sólo que tendremos que usar librerías de aserciones ligeramente diferentes, en este caso `supertest`

	var request = require('supertest'), 
	app = require('../index.js');

	describe( "PUT porra", function() {
		it('should create', function (done) {
		request(app)
			.put('/porra/uno/dos/tres/4')
			.expect('Content-Type', /json/)
			.expect(200,done);
		});
	});

(que tendrá que estar incluido en el directorio `test/`, como el resto). En vez de ejecutar la aplicación (que también podríamos hacerlo), lo que hacemos es que añadimos al final de `index.js` la línea:

	module.exports = app;

con lo que se exporta la app que se crea; `require` ejecuta el código y recibe la variable que hemos exportado, que podemos usar como si se tratara de parte de esta misma aplicación. `app` en este test, por tanto, contendrá lo mismo que en la aplicación principal, `index.js`. Usamos el mismo estilo de test con `mocha` que [ya se ha visto](http://jj.github.io/desarrollo-basado-pruebas) pero usamos funciones específicas:

* `request` hace una llamada sobre `app` como si la hiciéramos *desde fuera*; `put`, por tanto, llamará a la ruta correspondiente, que crea un partido sobre el que apostar.
* `expect` expresa qué se puede esperar de la respuesta. Por ejemplo, se puede esperar que sea de tipo JSON (porque es lo que enviamos, un JSON del partido añadido) y además que sea de tipo '200', respuesta correcta. Y como esta es la última de la cadena, llamamos a `done` que es en realidad una función que usa como parámetro el callback.

Podemos hacer más pruebas, usando get, por ejemplo. Pero se deja como ejercicio al alumno.

Estas pruebas permiten que no nos encontremos con sorpresas una vez que despeguemos en el PaaS. Así sabemos que, al menos, todas las rutas que hemos creado funcionan correctamente. 

> Crear pruebas de las rutas de la aplicación. 

## Desplegando en el PaaS

Podemos, por ejemplo, desplegarlo en Heroku.

> Sitios como Openshift or Nodester tienen sistemas también similares,
> pero por lo pronto vamos a usar este, que tiene un sistema un poco
> más abierto y completo.

Tras abrir una cuenta en Heroku, crear una
[aplicación en Node](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
es bastante directo. Primero, hay que tener en cuenta que en el PaaS,
como debería de ser obvio, se trata de aplicaciones web. Por eso la
aplicación más simple que se propone usa ya `express` (o, para el
caso, cualquier otro marco de servicios REST).

1. Descarga
   [el *cinturón de herramientas* de Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
2. Haz *login* con `heroku login`.
3. Descarga
   [la aplicación de ejemplo para node](https://github.com/heroku/node-js-getting-started.git). Es
   una aplicación simple de node y express. Heroku tiene una serie de
   ejemplos para diferentes lenguajes de programación. Por ejemplo,
   [para PHP](https://devcenter.heroku.com/articles/getting-started-with-php#prepare-the-app). Heroku
   admite [7 lenguajes, Scala, Clojure, Java, Ruby y Python](https://devcenter.heroku.com/start)
4. Con `heroku create` (dentro del directorio descargado) se crea la
   aplicación en heroku. Previamente lo único que había era un repo,
   con esta orden se crea una aplicación en heroku y se conecta con el
   repositorio descargado; esencialmente lo que se hace es que se
   añade un destino, `heroku` al que podemos hacer push. Con esto se
   crea una app de nombre aleatorio, que luego podremos modificar.
Puedes darle también un nombre a la aplicación y asignarle un servidor
   en Europa (legalmente obligatorio) escribiendo `heroku apps:create
   --region eu nombre_muy_chulo` Si te asignan un nombre puedes
   cambiarlo también más adelante, en la web y en el repo.

Esto crea una aplicación en la web de Heroku, que al hacer `git push heroku master` se pondrá en marcha. 

> Instalar y echar a andar tu primera aplicación en heroku.

Sólo hemos, por lo pronto, desplegado la aplicación por defecto. Se
habrá generado un fichero denominado `index.js` que será,
efectivamente, el que se ejecute. Pero ¿cómo sabe Heroku qué es lo que
hay que ejecutar? Si miramos el fichero `Procfile` encontraremos algo
así

```
web: node index.js
```

Este [Procfile](https://devcenter.heroku.com/articles/procfile) se usa
para indicar a heroku qué es lo que tiene que ejecutar. En casi todos
los casos se tratará de una aplicación web, y por tanto la parte
izquierda, `web:` será común. Dependiendo del lenguaje, variará la
parte derecha; en este caso le estamos indicando la línea de órdenes
que hay que ejecutar para *levaltar* la web que hemos creado.

Localmente, se recrea (aproximadamente) el entorno de heroku usando
Foreman. Para ejecutar localmente nuestra aplicación ejecutaremos
`foreman start web`. `foreman` leerá el `procfile` y ejecutará la
tarea correspondiente a `web`, en este caso `index.js`.  Podemos
interrumpirlo simplemente tecleanco Ctrl-C.

