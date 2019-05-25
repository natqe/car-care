import { ISession } from '../session/session.interface';
import { ConfirmPersonArgs, CreatePersonArgs } from './person.dto';
export declare class PersonResolver {
    isConfirmPerson(session: ISession): boolean;
    createPerson(phoneData: CreatePersonArgs, session: ISession): Promise<boolean>;
    confirmPerson({ verificationCode }: ConfirmPersonArgs, session: ISession): Promise<boolean>;
}
