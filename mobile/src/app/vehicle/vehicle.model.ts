import { Care } from '../care/care.model'
import { Fuel } from '../fuel/fuel.model'
import { Main } from '../main/main.model'
import { Test } from '../test/test.model'
import { Wash } from '../wash/wash.modal'
import { WithImage } from '../with-image/with-image.model'

export class Vehicle extends WithImage {
 readonly fuels: Array<Fuel>
 readonly tests: Array<Test>
 readonly washes: Array<Wash>
 readonly cares: Array<Care>
 readonly license: string
 readonly image: string
 readonly gallery: string
 readonly type: string
 readonly hand: string
 readonly km: string
 readonly color: string
 readonly productionDate: Date
 readonly producer: string
 readonly model: string
 readonly isActive: boolean
}

export enum EVehicle {
  sale = 'sale',
  fuels = 'fuels',
  tests = 'tests',
  washes = 'washes',
  cares = 'cares',
  license = 'license',
  type = 'type',
  hand = 'hand',
  image = 'image',
  gallery = 'gallery',
  km = 'km',
  color = 'color',
  productionDate = 'productionDate',
  producer = 'producer',
  model = 'model',
  isActive = 'isActive'
}