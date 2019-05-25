import { VehicleEntity } from '../database/vehicle.entity';
import { WithImageEntity } from '../database/with-image.abstract-entity';
export declare enum EPerson {
    phone = "phone",
    callingCode = "callingCode",
    vehicles = "vehicles",
    fullName = "fullName",
    language = "language",
    currency = "currency"
}
export declare const phone: EPerson, currency: EPerson, fullName: EPerson, language: EPerson, vehicles: EPerson, callingCode: EPerson;
export declare class Person extends WithImageEntity {
    readonly [phone]: number;
    readonly [callingCode]: number;
    readonly [vehicles]?: Array<VehicleEntity['_id']> | Array<VehicleEntity>;
    readonly [fullName]?: string;
    readonly [language]?: string;
    readonly [currency]?: string;
}
