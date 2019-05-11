import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    // GraphQLModule.forRoot({
    //   installSubscriptionHandlers: true,
    //   autoSchemaFile: 'schema.gql',
    //   playground: process.env.NODE_MODE !== 'production'
    // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}