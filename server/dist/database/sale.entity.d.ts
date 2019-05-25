import { VehicleEntity } from './vehicle.entity';
import { WithPriceEntity } from './with-price.abstract-entity';
export declare class SaleEntity extends WithPriceEntity {
    vehicle: VehicleEntity;
}
