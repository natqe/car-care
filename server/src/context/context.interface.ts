import { Context } from 'apollo-server-core'
import { ISession } from '../session/session.interface'

export enum EContext {
  session = 'session'
}

export const { session } = EContext

export interface IContext extends Context {
  [session]: ISession
}