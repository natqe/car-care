import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { production, TWILIO_PROVIDER } from './config/constants'
import { DATABASE_URL } from './config/env'
import { IContext } from './context/context.interface'
import { LanguageService } from './language/language.service'
import { Person } from './person/person.model'
import { PersonResolver } from './person/person.resolver'
import { RecipesModule } from './recipes/recipes.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: DATABASE_URL,
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
      provide: TWILIO_PROVIDER,
      useFactory: require(`twilio`)
    }
  ],
})
export class MainModule {
  // constructor() {
  //   setTimeout(()=> Person.delete({}), 10000)
  // }
 }