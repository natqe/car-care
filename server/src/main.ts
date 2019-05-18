import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

NestFactory.create(AppModule).then(app => {

  app.useGlobalPipes(new ValidationPipe())

  app.listen(process.env.PORT)

})
