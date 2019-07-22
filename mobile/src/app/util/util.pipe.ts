import entries from 'lodash/entries'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import keys from 'lodash/keys'
import { prefix } from 'utilizes/prefix'
import { suffix } from 'utilizes/suffix'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'util'
})
export class UtilPipe implements PipeTransform {
  transform(value, methodName: string, ...args): any {

    const
      // As replace to angular native keyvalue pipe. Because the angular one not keeping the order.
      keyvalue = obj => entries(obj).map(([key, value]) => ({ key, value })),
      methods = { get, suffix, prefix, keyvalue, keys, isEqual }

    return methods[methodName](value, ...args)

  }
}
