import { Observable, of, zip } from 'rxjs'
import { map } from 'rxjs/operators'
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router'
import { NavController } from '@ionic/angular'

export abstract class AppGuard implements CanActivate {

  constructor(protected readonly navController: NavController) { }

  protected abstract readonly defaultPath?: string | Observable<string>

  protected abstract readonly determineCanActive?: boolean | Observable<boolean>

  protected abstract readonly handlePath?: string | Observable<string>

  canActivate({ url: [{ path }] }: ActivatedRouteSnapshot) {
    const
      { navController, handlePath, defaultPath, determineCanActive } = this,
      ensureObservable = <T>(value): Observable<T> => value instanceof Observable ? value : of(value)
    return zip(
      ensureObservable<string>(handlePath),
      ensureObservable<string>(defaultPath),
      ensureObservable<boolean>(determineCanActive)
    ).
      pipe(
        map(([handlePathValue, defaultPathValue, determineCanActiveValue]) => {
          const isHandlePath = path === handlePathValue
          if (!determineCanActiveValue) {
            if (isHandlePath) return true
            else navController.navigateRoot(handlePathValue)
          }
          else if (isHandlePath) navController.navigateRoot(defaultPathValue)
          else return true
        })
      )
  }

}
