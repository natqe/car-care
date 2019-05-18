import { Kind } from 'graphql'
import { CustomScalar, Scalar } from '@nestjs/graphql'

@Scalar(`Date`, () => Date)
export class DateScalar implements CustomScalar<number, Date> {

  description = `Date custom scalar type`

  parseValue(value: number): Date {
    return new Date(value) // value from the client
  }

  serialize(value: Date): number {
    return value.getTime() // value sent to the client
  }

  parseLiteral(ast: any): Date {
      return ast.kind === Kind.INT ? new Date(ast.value): null
  }

}
