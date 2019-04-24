import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ModalController, Platform } from '@ionic/angular'

@Component({
  selector: 'app-fuel-modal',
  templateUrl: './fuel-modal.component.html',
  styleUrls: ['./fuel-modal.component.scss'],
})
export class FuelModalComponent implements OnInit {

  constructor(
    readonly platform: Platform,
    readonly modalController: ModalController) { }

  date = new Date().toISOString()

  save({ value }: NgForm) {

    const { date, modalController } = this

    console.log(value)

    modalController.dismiss()

  }

  ngOnInit() { }

}
