import * as connectPgSimple from 'connect-pg-simple'
import { static as expressStatic } from 'express'
import * as expressSession from 'express-session'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { production } from './config/constants'
import { DATABASE_URL, EXPRESS_SESSION_SECRET, PORT } from './config/env'
import { MainModule } from './main.module'

NestFactory.create(MainModule).then(app => {

  const PGStore = connectPgSimple(expressSession)

  app.
    useGlobalPipes(new ValidationPipe()).
    enableCors({
      credentials: true,
      origin: true
    }).
    use(expressSession({
      store: new PGStore({
        conObject: {
          connectionString: DATABASE_URL,
          ssl: production
        }
      }),
      secret: EXPRESS_SESSION_SECRET,
      cookie: {
        // sameSite: true,
        maxAge: 2 * 365 * 24 * 60 * 60 * 1000,
        secure: false
      },
      resave: false,
      saveUninitialized: false
    })).
    use(`/static`, expressStatic(`views/public`)).
    listen(PORT)

})