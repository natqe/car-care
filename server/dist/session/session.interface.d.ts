/// <reference types="express-session" />
import { EMain } from '../database/main.abstract-entity';
import { Person } from '../person/person.entity';
export declare enum ESession {
    personId = "personId",
    verificationCode = "verificationCode"
}
export declare const personId: ESession, verificationCode: ESession;
export interface ISession extends Express.Session {
    [personId]?: Person[EMain._id];
    [verificationCode]?: string;
}
