import { config } from 'dotenv'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

config()

NestFactory.create(AppModule).then(app => app.listen(process.env.PORT))
