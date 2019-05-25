import { BaseEntity } from 'typeorm';
export declare enum EMain {
    _id = "_id",
    _createDate = "_createDate",
    _updateDate = "_updateDate",
    _version = "_version",
    _type = "_type"
}
export declare const _createDate: EMain, _id: EMain, _type: EMain, _updateDate: EMain, _version: EMain;
export declare abstract class Main extends BaseEntity {
    readonly [_id]: string;
    readonly [_createDate]: Date;
    readonly [_updateDate]: Date;
    readonly [_version]: number;
    readonly [_type]: string;
}
