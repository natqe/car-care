import { Main } from '../main/main.model'

export class WithImage extends Main {
  readonly image?: string
}

export enum EWithImage {
  image = 'image'
}