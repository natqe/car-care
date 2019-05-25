import { Main } from './main.abstract-entity';
export declare enum EWithImageEntity {
    image = "image"
}
export declare const image: EWithImageEntity;
export declare abstract class WithImageEntity extends Main {
    readonly [image]?: string;
}
