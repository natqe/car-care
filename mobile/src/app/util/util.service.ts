import { Injectable } from '@angular/core'
import { LogService } from '../log/log.service'

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    logService: LogService) {
    logService.debugInstance(this)
  }

  convertToJqlParams(obj, { wrap = true }: { wrap: boolean } = { wrap: true }) {

    const
      objEntries = Object.entries(obj),
      shouldWrap = wrap && objEntries.length

    let params = `${shouldWrap ? `(` : ``}`

    for (const [index, [property, value]] of objEntries.entries()) {

      const quote = typeof value === `string` ? `"` : ``

      params += `${property}:${quote}${value}${quote}${index + 1 === objEntries.length ? `` : `, `}`

    }

    return params + `${shouldWrap ? `)` : ``}`

  }

}
