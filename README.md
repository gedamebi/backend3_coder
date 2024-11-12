<h1 align="center">Curso Backend III</h1><br><br>

## Descripción 
Primera pre entrega.
***


<br>
<h2 align="center">Lenguaje y Herramientas</h2>
<br><br>
<p align="center"> 
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="Javascript" width="90" height="90"/></a> 
    <a href="https://nodejs.org/en" target="_blank"> <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" alt="Boostrap" width="90" height="90"/></a> 
</p>
<br>
<p align="center"> 
    <a href="https://expressjs.com/" target="_blank"> <img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original-wordmark.svg" alt="React" width="90" height="90"/></a>
    <a href="https://www.npmjs.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/npm/npm-original-wordmark.svg" alt="npm" width="90" height="90"/></a>
</p>
<br><br>

## Funcionalidades 

- Crear un router llamado mocks.router.js que funcione bajo la ruta base /api/mocks.

- Mover el endpoint “/mockingpets” (Desarrollado en el primer Desafío Entregable) dentro de este router.

- Crear un módulo de Mocking para generar usuarios de acuerdo a un parámetro numérico. Dichos usuarios generados deberán tener las siguientes características:
    - En “password” debe tener la contraseña “coder123” encriptada.
    - “role” puede variar entre “user” y “admin”.
    - “pets” debe ir como array vacío.
    
- Dentro del router mocks.router.js, utilizar este módulo en un endpoint GET llamado “/mockingusers”, y generar 50 usuarios con el mismo formato que entregaría una petición de Mongo.

- Dentro del router mocks.router.js, desarrollar un endpoint POST llamado /generateData que reciba los parámetros numéricos “users” y “pets” para generar e insertar en la base de datos la cantidad de registros indicados.

- Comprobar dichos registros insertados mediante los servicios GET de users y pets

***

<br><br>

# Primera pre entrega NodeJS Modulo 3 (Germán Medina)

Dependencias incluidas en el proyecto:

  - [express](https://expressjs.com/)
  - [multer](https://www.npmjs.com/package/multer)
  - [nodemon](https://www.npmjs.com/package/nodemon)
  - [bcrypt](https://www.npmjs.com/package/bcrypt)
  - [cookie-parser](https://www.npmjs.com/package/cookie-parser)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
  - [mongoose](https://www.npmjs.com/package/mongoose?azure-portal=true)
  - [passport](https://www.npmjs.com/package/passport/v/0.7.0)
  - [passport-jwt](https://www.npmjs.com/package/passport-jwt)


## Ejecturar los siguientes comandos dentro del directorio luego de realizar el clon

```
  - npm install
  - npm run dev
```

<br><br>

---
### Autor: Germán Medina
---