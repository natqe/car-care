import { get } from 'lodash'
import { Injectable } from '@nestjs/common'
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

  private readonly store = <{ [key: string]: { [key: string]: string | number | boolean } }>{}

  async valueOf({ language = ELanguage.en, token, locals = {} }: IValueOfOptions) {

    const
      { store } = this,
      fromStore = () => store[language]

    if (!fromStore()) store[language] = await import(`./language.${language}`)

    let result = get(fromStore(), token)

    if (typeof result === 'string') for (const [key, value] of Object.entries(locals)) result = result.replace(new RegExp(`{ ${key} }`, `g`), value)

    return result

  }

}

new LanguageService().valueOf({ token: 'sdfsdf', locals: { code: 123456 } })
// הקוד הסודי שלך הוא
// Your code is
