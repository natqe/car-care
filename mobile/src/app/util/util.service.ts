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

  enumsToArray(...enums) {
    return enums.reduce((prev, curr) => prev.concat(Object.keys(curr)), [])
  }

  selectJqlResults(props: Array<string>) {
    return props.reduce((prev, curr) => `${prev}\n${curr}`)
  }

  selectJqlEnums(...enums) {
    return this.selectJqlResults(this.enumsToArray(...enums))
  }

}
