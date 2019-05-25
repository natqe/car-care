import { createParamDecorator, Logger } from '@nestjs/common'

export const Session = createParamDecorator((_, [,,{ session }])=> session)