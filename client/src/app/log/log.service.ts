import { castArray, cloneDeep, keys, lowerFirst } from 'lodash'
import * as moment from 'moment'
import { ensureUnique } from 'utilizes/ensure-unique'
import { prefix } from 'utilizes/prefix'
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { ionCssVariable } from '../../theme/variables/variables'

const { production } = environment

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() {

    this.debugInstance(this)

    if (!production) {

      window['moment'] = moment

      window['application'] = this.instances

      this.onTime('Init', `primary`)

      console.dir(this.instances)

    }

  }

  private readonly instances = new class application { }

  private readonly intervals = {}

  interval(handler: (...args: any[]) => boolean, timeout?: number, ...args: any[]) {

    const handle = window.setInterval(
      (...args: any[]) => {
        try {

          const finish = handler(...args)

          if (finish) this.clearInterval(handle)

        } catch (e) {
          this.error(e).clearInterval(handle)
        }
      },
      timeout,
      ...args
    )

    this.intervals[handle] = true

    return handle

  }

  clearInterval(handle?: number) {

    clearInterval(handle)

    this.intervals[handle] = false

    return this

  }

  onTime(message: string, color: 'primary' | 'secondary' | 'tertiary' | 'warn' | 'danger' = 'primary') {

    const
      bgColor = ionCssVariable(`color-${color}`),
      contrast = ionCssVariable(`color-${color}-contrast`)

    console.debug(`%c ${message} on ${moment().format('h:mm:ss.SSS a')} :`, `background-color:${bgColor};color:${contrast}`)

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