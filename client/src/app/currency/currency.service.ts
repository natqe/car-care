import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage'
import { ECurrency, USD } from './currency.enum'

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private readonly storage: Storage) {
    this.init()
  }

  private readonly storageKey = `currency`

  readonly current = new BehaviorSubject(USD)

  private async init() {

    const
      { storageKey, storage, current } = this,
      fromStorage = await storage.get(storageKey)

    if (!fromStorage) storage.set(storageKey, USD)
    else current.next(fromStorage)

  }

  setCurrent(value: ECurrency) {

    const { storageKey, storage, current } = this

    current.next(value)

    return storage.set(storageKey, value)

  }

}
