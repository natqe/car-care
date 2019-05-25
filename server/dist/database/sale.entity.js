"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const vehicle_entity_1 = require("./vehicle.entity");
const with_price_abstract_entity_1 = require("./with-price.abstract-entity");
let SaleEntity = class SaleEntity extends with_price_abstract_entity_1.WithPriceEntity {
};
__decorate([
    typeorm_1.OneToOne(() => vehicle_entity_1.VehicleEntity),
    __metadata("design:type", vehicle_entity_1.VehicleEntity)
], SaleEntity.prototype, "vehicle", void 0);
SaleEntity = __decorate([
    typeorm_1.Entity()
], SaleEntity);
exports.SaleEntity = SaleEntity;
//# sourceMappingURL=sale.entity.js.map