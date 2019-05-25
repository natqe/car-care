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
var _a, _b, _c, _d, _e, _f;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const with_image_abstract_entity_1 = require("../database/with-image.abstract-entity");
var EPerson;
(function (EPerson) {
    EPerson["phone"] = "phone";
    EPerson["callingCode"] = "callingCode";
    EPerson["vehicles"] = "vehicles";
    EPerson["fullName"] = "fullName";
    EPerson["language"] = "language";
    EPerson["currency"] = "currency";
})(EPerson = exports.EPerson || (exports.EPerson = {}));
exports.phone = EPerson.phone, exports.currency = EPerson.currency, exports.fullName = EPerson.fullName, exports.language = EPerson.language, exports.vehicles = EPerson.vehicles, exports.callingCode = EPerson.callingCode;
let Person = class Person extends with_image_abstract_entity_1.WithImageEntity {
};
_a = exports.phone, _b = exports.callingCode, _c = exports.vehicles, _d = exports.fullName, _e = exports.language, _f = exports.currency;
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Person.prototype, _a, void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Person.prototype, _b, void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    typeorm_1.Column(`text`, { array: true, nullable: true }),
    __metadata("design:type", Array)
], Person.prototype, _c, void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Person.prototype, _d, void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Person.prototype, _e, void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Person.prototype, _f, void 0);
Person = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Person);
exports.Person = Person;
//# sourceMappingURL=person.entity.js.map