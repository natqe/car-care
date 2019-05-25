import { ActionEntity } from './action.abstract-entity';
import { VehicleEntity } from './vehicle.entity';
export declare class TestEntity extends ActionEntity {
    vehicle: VehicleEntity;
    actionDate: Date;
    price: number;
    currency: string;
    expirationDate: Date;
}
