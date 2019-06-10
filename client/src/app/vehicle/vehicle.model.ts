import { Care } from '../care/care.model'
import { Fuel } from '../fuel/fuel.model'
import { Main } from '../main/main.model'
import { Test } from '../test/test.model'
import { Wash } from '../wash/wash.modal'
import { WithImage } from '../with-image/with-image.model'

export class Vehicle extends WithImage {
  // fuels?: Array<Fuel>
  // tests?: Array<Test>
  // washes?: Array<Wash>
  // cares?: Array<Care>
  license: string
  // type: string
  // hand: string
  // km: string
  // color: string
  // productionDate: Date
  producer: string
  model: string
  // isActive: boolean
}

export enum EVehicle {
  // fuels = 'fuels',
  // tests = 'tests',
  // washes = 'washes',
  // cares = 'cares',
  license = 'license',
  // type = 'type',
  // hand = 'hand',
  // km = 'km',
  // color = 'color',
  // productionDate = 'productionDate',
  producer = 'producer',
  model = 'model',
  // isActive = 'isActive'
}