import { get, reduce } from 'lodash'
import { Injectable, Logger } from '@nestjs/common'
import { ELanguage } from './language.enum'

interface IValueOfOptions {
  token: string
  language?: ELanguage
  locals?: {
    [key: string]: any
  }
}

@Injectable()
export class LanguageService {

  constructor() { }

  private readonly store = <{ [key: string]: { [key: string]: string | number | boolean } }>{}

   valueOf<T extends string>(options: IValueOfOptions): Promise<T>
   valueOf<T extends number>(options: IValueOfOptions): Promise<T>
   valueOf<T extends boolean>(options: IValueOfOptions): Promise<T>
  async valueOf({ language = ELanguage.en, token, locals = {} }: IValueOfOptions) {

    const
      { store } = this,
      fromStore = () => store[language]

    if (!fromStore()) {

      const languageModule = await import(`./language.${language}`)

      store[language] = languageModule.default

    }

    let result = get(fromStore(), token)

    if (typeof result === 'string') for (const [key, value] of Object.entries(locals)) result = result.replace(new RegExp(`\\{{2}\\s*${key}\\s*\\}{2}`, `g`), value)

    return result

  }

}
