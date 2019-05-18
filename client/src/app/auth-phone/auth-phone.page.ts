import invoke from 'lodash/invoke'
import { Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Country } from '../country/country.model'
import { CountryService } from '../country/country.service'

const
  PHONE = `phone`,
  PREFIX = `prefix`

@Component({
  selector: 'app-auth-phone',
  templateUrl: './auth-phone.page.html',
  styleUrls: ['./auth-phone.page.scss']
})
export class AuthPhonePage extends FormGroup implements OnInit {

  constructor(readonly countryService: CountryService) {

    super({
      [PHONE]: new FormControl(null, [Validators.required]),
      [PREFIX]: new FormControl(null)
    })

    const { controls } = this

    countryService.default.subscribe(
      ({ callingCodes }) =>
        callingCodes[0] ?
          controls[PREFIX].setValue(callingCodes[0]) :
          countryService.biggest.subscribe(biggestCountry => controls[PREFIX].setValue(biggestCountry.callingCodes[0]))
    )

    console.log(this)

  }

  readonly controlsNames = { PHONE, PREFIX }

  async handleSubmit() { }

  ngOnInit() {
  }

}