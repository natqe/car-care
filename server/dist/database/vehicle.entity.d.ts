import { Person } from '../person/person.entity';
import { CareEntity } from './care.entity';
import { FuelEntity } from './fuel.entity';
import { SaleEntity } from './sale.entity';
import { TestEntity } from './test.entity';
import { WashEntity } from './wash.entity';
import { WithImageEntity } from './with-image.abstract-entity';
export declare class VehicleEntity extends WithImageEntity {
    sale: SaleEntity;
    fuels: Array<FuelEntity>;
    washes: Array<WashEntity>;
    cares: Array<CareEntity>;
    tests: Array<TestEntity>;
    gallery: Array<string>;
    user: Person['_id'] | Person;
    license: string;
    type: string;
    hand: number;
    km: number;
    color: string;
    productionDate: Date;
    producer: string;
    model: string;
    isActive: boolean;
}
