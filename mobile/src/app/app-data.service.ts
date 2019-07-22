import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import merge from 'lodash/merge'
import reject from 'lodash/reject'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { catchError, filter, first, map, mapTo, switchMap, switchMapTo, tap } from 'rxjs/operators'

type item<T> = T extends Array<any> ? T[0] : void

type single<T> = T extends Array<any> ? T[0] : T

export abstract class AppDataService<T> {

  private _load: Observable<T>

  private _create: Observable<single<T>>

  private _edit: Observable<Partial<single<T>>>

  private _delete: Observable<Partial<item<T>>>

  protected readonly findBy?: keyof item<T>

  private readonly _forMany = new BehaviorSubject<boolean>(null)

  private readonly clearWasActive = new BehaviorSubject(false)

  private readonly clearValueOptions = new BehaviorSubject({ loadNext: false, itemToRemove: <Partial<item<T>>>null })

  private readonly _value = new BehaviorSubject<T>(null)

  private readonly _loading = new BehaviorSubject<boolean>(null)

  private readonly _creating = new BehaviorSubject<boolean>(null)

  private readonly _editing = new BehaviorSubject<boolean>(null)

  private readonly _deleting = new BehaviorSubject<boolean>(null)

  private readonly _loadingSuccess = new BehaviorSubject<boolean>(null)

  private readonly _creatingSuccess = new BehaviorSubject<boolean>(null)

  private readonly _editingSuccess = new BehaviorSubject<boolean>(null)

  private readonly _deletingSuccess = new BehaviorSubject<boolean>(null)

  readonly value = this._value.asObservable().pipe(
    tap(value => {
      const { _load, clearValueOptions: clearValueArgs, clearWasActive } = this
      if (value === null && _load) if (!clearWasActive.getValue() || clearValueArgs.getValue().loadNext) _load.
        pipe(
          first()
        ).
        subscribe()
    }),
    map(cloneDeep)
  )

  readonly loading = this._loading.asObservable()

  readonly creating = this._creating.asObservable()

  readonly editing = this._editing.asObservable()

  readonly deleting = this._deleting.asObservable()

  readonly loadingSuccess = this._loadingSuccess.asObservable().pipe(
    switchMap(value => this._loading.pipe(
      filter(value => !value),
      first(),
      mapTo(value)
    ))
  )

  readonly creatingSuccess = this._creatingSuccess.asObservable().pipe(
    switchMap(value => this._creating.pipe(
      filter(value => !value),
      first(),
      mapTo(value)
    ))
  )

  readonly editingSuccess = this._editingSuccess.asObservable().pipe(
    switchMap(value => this._editing.pipe(
      filter(value => !value),
      first(),
      mapTo(value)
    ))
  )

  readonly deletingSuccess = this._deletingSuccess.asObservable().pipe(
    switchMap(value => this._deleting.pipe(
      filter(value => !value),
      first(),
      mapTo(value)
    ))
  )

  protected set forMany(value: boolean) {
    this._forMany.next(value)
  }

  protected set load(executer: AppDataService<T>['_load']) {
    this._load = this.wrapAsync(executer).pipe(switchMap(value => this.loadingSuccess.pipe(
      first(),
      tap(success => {
        if (success) this.set(value)
      }),
      mapTo(value)
    )))
  }

  protected set create(executer: AppDataService<T>['_create']) {
    if (executer instanceof Observable) this._create = of(null).pipe(
      tap(() => this.setCreating(true)),
      switchMapTo(executer.pipe(first())),
      tap(value => {
        this.add(value)
        this.setCreatingSuccess(true)
      }),
      catchError(response => {
        this.setCreatingSuccess(false)
        return this.handleCreatingError(response)
      }),
      tap(() => this.setCreating(false))
    )
  }

  protected set edit(executer: AppDataService<T>['_edit']) {
    if (executer instanceof Observable) this._edit = of(null).pipe(
      tap(() => this.setEditing(true)),
      switchMapTo(executer.pipe(first())),
      tap(value => {
        this.patch(value)
        this.setEditingSuccess(true)
      }),
      catchError(response => {
        this.setEditingSuccess(false)
        return this.handleEditingError(response)
      }),
      tap(() => this.setEditing(false))
    )
  }

  protected set delete(executer: AppDataService<T>['_delete']) {
    if (executer instanceof Observable) this._delete = of(null).pipe(
      tap(() => this.setDeleing(true)),
      switchMapTo(executer.pipe(first())),
      tap(value => {
        this.remove({ itemToRemove: value, loadNext: false })
        this.setDeleingSuccess(true)
      }),
      catchError(response => {
        this.setDeleingSuccess(false)
        return this.handleDeletingError(response)
      }),
      tap(() => this.setDeleing(false))
    )
  }

  protected get load() {
    return this._load
  }

  protected get create() {
    return this._create
  }

  protected get edit() {
    return this._edit
  }

  protected get delete() {
    return this._delete
  }

  private handleNext(observable: BehaviorSubject<any>, value) {
    if (!isEqual(value, observable.getValue())) observable.next(value)
  }

  private setLoading(value: boolean) {
    this._loading.next(value)
  }

  private setCreating(value: boolean) {
    this._creating.next(value)
  }

  private setEditing(value: boolean) {
    this._editing.next(value)
  }

  private setDeleing(value: boolean) {
    this._deleting.next(value)
  }

  private setLoadingSuccess(value: boolean) {
    this._loadingSuccess.next(value)
  }

  private setCreatingSuccess(value: boolean) {
    this._creatingSuccess.next(value)
  }

  private setEditingSuccess(value: boolean) {
    this._editingSuccess.next(value)
  }

  private setDeleingSuccess(value: boolean) {
    this._deletingSuccess.next(value)
  }

  protected wrapAsync<P>(executer: Observable<P>) {
    if (executer instanceof Observable) return of(null).pipe(
      tap(() => this.setLoading(true)),
      switchMapTo(executer.pipe(first())),
      tap(() => this.setLoadingSuccess(true)),
      catchError(response => {
        this.setLoadingSuccess(false)
        return this.handleLoadingError(response)
      }),
      tap(() => this.setLoading(false))
    )
  }

  protected handleError(response) {
    console.error(response)
    return of(response)
  }

  protected handleLoadingError(response) {
    return this.handleError(response)
  }

  protected handleCreatingError(response) {
    return this.handleError(response)
  }

  protected handleEditingError(response) {
    return this.handleError(response)
  }

  protected handleDeletingError(response) {
    return this.handleError(response)
  }

  set(value: T) {
    this.handleNext(this._value, value)
  }

  add(value: single<T>) {
    const { _value, _forMany } = this
    this.handleNext(_value, _forMany.getValue() ? (_value.getValue() as any || []).concat(value) : value)
  }

  patch(value: Partial<single<T>>) {
    const
      { _value, _forMany: isMany, findBy } = this,
      isArray = isMany.getValue(),
      pValue = _value.getValue(),
      pValueAsArray = _value.getValue() as any as Array<any>,
      findCallback = ({ [findBy]: id }) => id === value[findBy as string],
      old = isArray ? pValueAsArray.find(findCallback) : pValue,
      mergedValue: single<T> = merge(cloneDeep(old), cloneDeep(value))
    if (!isEqual(old, mergedValue)) {
      if (isArray) pValueAsArray.splice(pValueAsArray.findIndex(findCallback), 1, mergedValue);
      _value.next(isArray ? pValueAsArray as any : mergedValue as any as T)
    }
  }

  remove({ loadNext = this.clearValueOptions.getValue().loadNext, itemToRemove = this.clearValueOptions.getValue().itemToRemove } = this.clearValueOptions.getValue()) {
    const { clearValueOptions: clearValueArgs, _value, _forMany: isMany } = this
    clearValueArgs.next({ ...clearValueArgs.getValue(), loadNext })
    _value.next(isMany.getValue() && itemToRemove ? (reject(_value.getValue() as any, itemToRemove) as any) : null)
  }

}