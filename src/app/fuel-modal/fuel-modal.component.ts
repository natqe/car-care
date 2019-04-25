import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Keyboard } from '@ionic-native/keyboard/ngx'
import { ModalController, Platform } from '@ionic/angular'

@Component({
  selector: 'app-fuel-modal',
  templateUrl: './fuel-modal.component.html',
  styleUrls: ['./fuel-modal.component.scss'],
})
export class FuelModalComponent implements OnInit {

  constructor(
    readonly platform: Platform,
    readonly keyboard: Keyboard,
    readonly modalController: ModalController) { }

  date = new Date().toISOString()

  save({ value }: NgForm) {

    const { date, modalController } = this

    console.log(value)

    setTimeout(() => modalController.dismiss(), 1000)

    modalController.dismiss()

  }

  ngOnInit() { }

}
