import { Care } from '../care/care.model'
import { Fuel } from '../fuel/fuel.model'
import { Test } from '../test/test.model'
import { Wash } from '../wash/wash.modal'

export class Vehicle {
  state = {
    care: new Care,
    test: new Test,
    wash: new Wash,
    fuel: new Fuel
  }
}