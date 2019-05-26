import { Context } from 'apollo-server-core'
import { ISession } from '../session/session.interface'

export interface IContext extends Context {
  session: ISession
}

export enum EContext {
  session = 'session'
}