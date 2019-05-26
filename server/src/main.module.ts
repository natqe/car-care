import * as plivo from 'plivo'
import { Logger, Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PLIVO_CLIENT, production } from './config/constants'
import { IContext } from './context/context.interface'
import { LanguageService } from './language/language.service'
import { PersonResolver } from './person/person.resolver'
import { RecipesModule } from './recipes/recipes.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [`${!production ? 'src' : 'dist'}/**/**.model.${!production ? `t` : `j`}s`],
      synchronize: true,
      logging: true,
      ssl: production,
      // dropSchema: true
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: `schema.gql`,
      playground: !production,
      context({ req: { session } }): IContext {
        return { session }
      },
      cors: false
    }),
    RecipesModule
  ],
  controllers: [],
  providers: [
    PersonResolver,
    LanguageService,
    {
      provide: PLIVO_CLIENT,
      useClass: plivo.Client
    }
  ],
})
export class MainModule { }