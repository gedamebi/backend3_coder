import { cpus } from 'node:os'
import cluster from 'node:cluster'

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

import { addLogger, logger } from './utils/logger.js'

import swaggerUiExpress from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import dotenv from 'dotenv'
dotenv.config()

let currentDate = new Date();
const nucleos = cpus().length
if(cluster.isPrimary){
    logger.info('Proceso Principal ID:', process.pid + " > " + currentDate)
    logger.info('Soy el cluster principal, voy a forkear (worker)' + " > " + currentDate)
    for(let i=0; i<nucleos; i++){
        cluster.fork()
    }
} else {
  const app = express();
  const PORT = process.env.PORT||8080;

  try {

    await mongoose.connect(process.env.DATABASE_URL, { dbName: process.env.DB_NAME })
    currentDate = new Date();
    logger.info('BBDD conectada' + " > " + currentDate)

    const swaggerOptions = {
      definition:{
          openapi:'3.0.1',
          info:{
              title: 'Adopme API',
              description: 'Documentacion de API Adopme entrega final backend'
          }
      },
      apis:['./src/docs/**/*.yaml']
    }
    const specs = swaggerJsDoc(swaggerOptions)

    app.use('/apidocs',swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended : true }))
    app.use(addLogger)

    app.use('/api/users',usersRouter);
    app.use('/api/pets',petsRouter);
    app.use('/api/adoptions',adoptionsRouter);
    app.use('/api/sessions',sessionsRouter);
    app.use('/api/mocks',mocksRouter);

    app.listen(PORT,()=>{
      currentDate = new Date();
      logger.info(`Escuchando puerto ${PORT}` + " > " + currentDate)
      console.log(`Escuchando puerto ${PORT}`)
    })

  } catch (e) {
    currentDate = new Date();
    logger.warning('Error al conectarse a la bbdd' + e + " > " + currentDate) 
  }
}


