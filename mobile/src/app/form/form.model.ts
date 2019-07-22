import { Observable } from 'rxjs'
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms'

export interface IFormGroup<F extends { value }, K extends keyof F['value']> extends FormGroup {
  readonly value: F['value'][K]
  setValue(value: this['value'], options?: {
    onlySelf?: boolean
    emitEvent?: boolean
    emitModelToViewChange?: boolean
    emitViewToModelChange?: boolean
  }): void
  patchValue(value: Partial<this['value']>, options?: {
    onlySelf?: boolean
    emitEvent?: boolean
    emitModelToViewChange?: boolean
    emitViewToModelChange?: boolean
  }): void
  valueChanges: Observable<F['value'][K]>
}

export interface IFormControl<F extends { value }, K extends keyof F['value']> extends FormControl {
  readonly value: F['value'][K]
  setValue(value: this['value'], options?: {
    onlySelf?: boolean
    emitEvent?: boolean
    emitModelToViewChange?: boolean
    emitViewToModelChange?: boolean
  }): void
  patchValue(value: Partial<this['value']>, options?: {
    onlySelf?: boolean
    emitEvent?: boolean
    emitModelToViewChange?: boolean
    emitViewToModelChange?: boolean
  }): void
  valueChanges: Observable<F['value'][K]>
}

export type FormControls<F extends { value }> = {
  [key in keyof F['value']]: F['value'][key] extends object ? IFormGroup<F, key> : IFormControl<F, key>
}