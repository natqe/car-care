import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PhoneResolver } from './phone/phone.resolver'
import { RecipesModule } from './recipes/recipes.module'

const production = process.env.NODE_ENV === 'production'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [`${!production ? 'src' : 'dist'}/**/**.entity.${!production ? `t` : `j`}s`],
      synchronize: !production,
      logging: !production,
      ssl: production
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      playground: !production
    }),
    RecipesModule
  ],
  controllers: [],
  providers: [PhoneResolver],
})
export class AppModule {}