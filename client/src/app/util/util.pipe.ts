import get from 'lodash/get'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'util'
})
export class UtilPipe implements PipeTransform {

  transform(value, methodName: string, ...args): any {
    switch (methodName) {
      //@ts-ignore
      case `get`: return get(value, ...args)
      default: throw `couldn't find helper ${methodName}`
    }
  }

}
