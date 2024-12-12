import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

import { addLogger } from './utils/logger.js'

import swaggerUiExpress from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT = process.env.PORT||8080;

try {

  await mongoose.connect(process.env.DATABASE_URL, { dbName: process.env.DB_NAME })
  console.log('BBDD conectada')

  const swaggerOptions = {
    definition:{
        openapi:'3.0.1',
        info:{
            title: 'Adopme api',
            description: 'nuestra primera documentacion practicando con swagger'
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

  app.listen(PORT,()=>console.log(`Escuchando puerto ${PORT}`))



} catch (e) {
    console.log('Error al conectarse a la bbdd' + e)
}


