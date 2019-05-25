import { Context } from 'apollo-server-core';
import { ISession } from '../session/session.interface';
export declare enum EContext {
    session = "session"
}
export declare const session: EContext;
export interface IContext extends Context {
    [session]: ISession;
}
