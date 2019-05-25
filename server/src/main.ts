import 'dotenv/config'
import * as connectPgSimple from 'connect-pg-simple'
import * as expressSession from 'express-session'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

NestFactory.create(AppModule).then(app => {

  const
    production = process.env.NODE_MODE === `production`,
    PGStore = connectPgSimple(expressSession)

  app.
    useGlobalPipes(new ValidationPipe()).
    enableCors({
      credentials: true,
      origin: true
    }).
    use(expressSession({
      store: new PGStore({
        ttl: 2 * 60 * 60 * 1000,
        conObject: {
          connectionString: process.env.DATABASE_URL,
          ssl: production
        }
      }),
      secret: 'dasddad',
      cookie: {
        // sameSite: true,
        maxAge: 2 * 60 * 60 * 1000,
        secure: production
      },
      resave: false,
      saveUninitialized: false
    })).
    listen(process.env.PORT)

})
