import isEqual from 'lodash/isEqual'
import uniqWith from 'lodash/uniqWith'
import { Observable, Subscriber } from 'rxjs'
import { map } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Platform } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import { CountryService } from '../country/country.service'
import { ECurrency, USD } from './currency.enum'

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private currentSubscriber: Subscriber<ECurrency>

  constructor(
    private readonly platform: Platform,
    private readonly storage: Storage,
    private readonly countryService: CountryService) { }

  private readonly storageKey = `currency`

  readonly all = this.countryService.all.pipe(map(value => uniqWith(value.flatMap(({ currencies }) => currencies), isEqual)))

  readonly current = new Observable<ECurrency>((subscriber) => {

    const { platform, storageKey, storage } = this

    this.currentSubscriber = subscriber

    platform.ready().then(async () => {

      let value = await storage.get(storageKey)

      if (!value) {

        value = USD

        storage.get(storageKey)

      }

      subscriber.next(value)

    })

  })

  setCurrent(value: ECurrency) {

    const { storageKey, storage, currentSubscriber } = this

    currentSubscriber.next(value)

    return storage.set(storageKey, value)

  }

}
