import { EMain } from '../database/main.abstract-entity'
import { Person } from '../person/person.entity'

export enum ESession {
  personId = 'personId',
  verificationCode = 'verificationCode'
}

export const { personId, verificationCode } = ESession

export interface ISession extends Express.Session {

  [personId]?: Person[EMain._id]

  [verificationCode]?: string

}