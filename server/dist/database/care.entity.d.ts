import { ActionEntity } from './action.abstract-entity';
import { VehicleEntity } from './vehicle.entity';
export declare class CareEntity extends ActionEntity {
    vehicle: VehicleEntity;
    type: string;
    description: string;
    km: number;
}
