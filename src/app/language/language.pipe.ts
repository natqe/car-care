import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core'
import { LanguageService } from './language.service'

@Pipe({
  name: 'language',
  pure: false
})
export class LanguagePipe implements PipeTransform {

  constructor(private readonly languageService: LanguageService) { }

  transform(key: string, locals?: { [key: string]: any }): string {
    return this.languageService.currentValueOf(key, locals)
  }

}
