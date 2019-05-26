import { EMain } from '../main.abstract'
import { Person } from '../person/person.model'

export enum ESession {
  personId = 'personId',
  verificationCode = 'verificationCode'
}

export interface ISession extends Express.Session {

  [ESession.personId]?: Person[EMain._id]

  [ESession.verificationCode]?: string

}