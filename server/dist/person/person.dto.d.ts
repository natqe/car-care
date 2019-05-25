import { ESession, ISession, verificationCode } from '../session/session.interface';
import { callingCode, EPerson, Person, phone } from './person.entity';
export declare class CreatePersonArgs implements Partial<Person> {
    readonly [phone]: Person[EPerson.phone];
    readonly [callingCode]: Person[EPerson.callingCode];
}
export declare class ConfirmPersonArgs implements Partial<ISession> {
    readonly [verificationCode]: ISession[ESession.verificationCode];
}
