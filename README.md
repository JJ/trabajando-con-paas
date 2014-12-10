Trabajando con Plataformas como servicio.
===================

##Objetivos

1. Conocer herramientas de desarrollo rápido de aplicaciones web en node.
2. Conocer las diferentes plataformas *freemium* PaaS existentes.
3. Entender el concepto de PaaS y como se relaciona con los otros niveles de la nube.

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

