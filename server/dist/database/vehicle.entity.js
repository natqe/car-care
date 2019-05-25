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
const care_entity_1 = require("./care.entity");
const fuel_entity_1 = require("./fuel.entity");
const sale_entity_1 = require("./sale.entity");
const test_entity_1 = require("./test.entity");
const wash_entity_1 = require("./wash.entity");
const with_image_abstract_entity_1 = require("./with-image.abstract-entity");
let VehicleEntity = class VehicleEntity extends with_image_abstract_entity_1.WithImageEntity {
};
__decorate([
    typeorm_1.OneToOne(() => sale_entity_1.SaleEntity, { nullable: true }),
    __metadata("design:type", sale_entity_1.SaleEntity)
], VehicleEntity.prototype, "sale", void 0);
__decorate([
    typeorm_1.OneToMany(() => fuel_entity_1.FuelEntity, ({ vehicle }) => vehicle),
    __metadata("design:type", Array)
], VehicleEntity.prototype, "fuels", void 0);
__decorate([
    typeorm_1.OneToMany(() => wash_entity_1.WashEntity, ({ vehicle }) => vehicle),
    __metadata("design:type", Array)
], VehicleEntity.prototype, "washes", void 0);
__decorate([
    typeorm_1.OneToMany(() => care_entity_1.CareEntity, ({ vehicle }) => vehicle),
    __metadata("design:type", Array)
], VehicleEntity.prototype, "cares", void 0);
__decorate([
    typeorm_1.OneToMany(() => test_entity_1.TestEntity, ({ vehicle }) => vehicle),
    __metadata("design:type", Array)
], VehicleEntity.prototype, "tests", void 0);
__decorate([
    typeorm_1.Column(`text`, { array: true }),
    __metadata("design:type", Array)
], VehicleEntity.prototype, "gallery", void 0);
__decorate([
    typeorm_1.Column(`text`),
    __metadata("design:type", Object)
], VehicleEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], VehicleEntity.prototype, "license", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], VehicleEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], VehicleEntity.prototype, "hand", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], VehicleEntity.prototype, "km", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], VehicleEntity.prototype, "color", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], VehicleEntity.prototype, "productionDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], VehicleEntity.prototype, "producer", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], VehicleEntity.prototype, "model", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], VehicleEntity.prototype, "isActive", void 0);
VehicleEntity = __decorate([
    typeorm_1.Entity()
], VehicleEntity);
exports.VehicleEntity = VehicleEntity;
//# sourceMappingURL=vehicle.entity.js.map