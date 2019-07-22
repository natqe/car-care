import { castArray, cloneDeep, keys, lowerFirst } from 'lodash'
import moment from 'moment'
import { ensureUnique } from 'utilizes/ensure-unique'
import { prefix } from 'utilizes/prefix'
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { StyleService } from '../style/style.service'

const { production } = environment

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private readonly instances = new class application { }

  constructor(private readonly styleService: StyleService) {

    this.debugInstance(this)

    if (!production) {

      const { instances } = this

      window['application'] = instances

      this.onTime('Init', `primary`)

      console.dir(instances)

    }

  }

  onTime(message: string, color: 'primary' | 'secondary' | 'tertiary' | 'warn' | 'danger' = 'primary') {

    const
      { styleService } = this,
      bgColor = styleService.ionCssVariable(`color-${color}`),
      contrast = styleService.ionCssVariable(`color-${color}-contrast`)

    console.debug(`%c ${message} on ${moment().format('H:mm:ss.SSS')}:`, `background-color:${bgColor};color:${contrast}`)

    return this

  }

  debugInstance(that) {

    const { instances } = this

    if (!production) instances[ensureUnique(lowerFirst(that.constructor.name), keys(instances))] = that

    return this

  }

  now(...args) {

    if (!production) {

      this.onTime('Cloned', `tertiary`)

      args.length ? console.trace(...args.map(cloneDeep)) : console.dir(cloneDeep(this.instances))

    }

    return this

  }

  error(...args) {

    console[!production ? 'error' : 'trace'](`${prefix(production && 'Error in ', moment().format('h:mm:ss.SSS'))} :`, ...args)

    return this

  }

  debug(...args) {

    if (!production) console.trace(...args)

    return this

  }

  invoke(fn: Function, now = false) {

    if (!production) this[!now ? 'debug' : 'now'](...castArray(fn()))

    return this

  }

}