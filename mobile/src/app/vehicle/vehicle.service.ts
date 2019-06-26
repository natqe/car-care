import { Injectable } from '@angular/core'
import { VehiclesService } from '../vehicles/vehicles.service'
import { Vehicle } from './vehicle.model'

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private readonly vehiclesService: VehiclesService) { }

  item(id) {

  }

}
