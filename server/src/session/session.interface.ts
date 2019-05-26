import { Person } from '../person/person.model'

export enum ESession {
  personId = 'personId',
  verificationCode = 'verificationCode'
}

export interface ISession extends Express.Session {
  personId?: Person['_id']
  verificationCode?: string
}