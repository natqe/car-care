import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IContext } from './context/context.interface'
import { PersonResolver } from './person/person.resolver'
import { RecipesModule } from './recipes/recipes.module'

const production = process.env.NODE_ENV === 'production'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [`${!production ? 'src' : 'dist'}/**/**.entity.${!production ? `t` : `j`}s`],
      synchronize: !production,
      logging: !production || true,
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
  providers: [PersonResolver],
})
export class AppModule { }