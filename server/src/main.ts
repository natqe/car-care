import * as connectPgSimple from 'connect-pg-simple'
import { static as expressStatic } from 'express'
import * as session from 'express-session'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { production } from './config/constants'
import { DATABASE_URL, EXPRESS_SESSION_SECRET, PORT } from './config/env'
import { MainModule } from './main.module'

NestFactory.create(MainModule).then(app => {

  const PGStore = connectPgSimple(session)

  app.
    use(`/static`, expressStatic(`views/public`)).
    use(session({
      secret: EXPRESS_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 2 * 365 * 24 * 60 * 60 * 1000,
        secure: false
      },
      store: new PGStore({
        conObject: {
          connectionString: DATABASE_URL,
          ssl: production
        }
      })
    })).
    useGlobalPipes(new ValidationPipe()).
    enableCors({
      credentials: true,
      origin: true
    }).
    listen(PORT)

})