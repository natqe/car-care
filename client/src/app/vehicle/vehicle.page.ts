import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { VehicleService } from './vehicle.service'

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.page.html',
  styleUrls: ['./vehicle.page.scss'],
})
export class VehiclePage implements OnInit {

  constructor(
    private readonly vehicleService: VehicleService,
    private readonly activatedRoute: ActivatedRoute) { }

  id = this.activatedRoute.snapshot.paramMap.get(`id`)
// TODO remove this line, it is form implementing ui only
  date = new Date

  ngOnInit() {
  }

}
