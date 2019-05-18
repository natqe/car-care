import { Args, Query, Resolver } from '@nestjs/graphql'
import { Phone } from './phone.entity'

@Resolver(()=> Phone)
export class PhoneResolver {
  @Query(returns => Phone)
  async phone(@Args('id') id: string): Promise<Phone> {
return null
  }
}
