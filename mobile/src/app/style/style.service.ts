import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  constructor() { }

  ionCssVariable(target: string, fromElement = document.documentElement) {

    const prefix = `--ion-`

    if (!target.startsWith(prefix)) target = `${prefix}${target}`

    return getComputedStyle(fromElement)
      .getPropertyValue(target)
      .trim()

  }

  ionColorPrimaryRgba(opacity = 1) {
    return `rgba(${this.ionCssVariable(`color-primary-rgb`)},${opacity})`
  }

}
