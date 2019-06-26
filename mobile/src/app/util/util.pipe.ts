import get from 'lodash/get'
import { prefix } from 'utilizes/prefix'
import { suffix } from 'utilizes/suffix'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'util'
})
export class UtilPipe implements PipeTransform {
  transform(value, methodName: string, ...args): any {

    const methods = { get, suffix, prefix }

    return methods[methodName](value, ...args)

  }
}
