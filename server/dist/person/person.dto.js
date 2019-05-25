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
var _a, _b, _c;
const type_graphql_1 = require("type-graphql");
const session_interface_1 = require("../session/session.interface");
const person_entity_1 = require("./person.entity");
let CreatePersonArgs = class CreatePersonArgs {
};
_a = person_entity_1.phone, _b = person_entity_1.callingCode;
__decorate([
    type_graphql_1.Field(() => Number),
    __metadata("design:type", Object)
], CreatePersonArgs.prototype, _a, void 0);
__decorate([
    type_graphql_1.Field(() => Number),
    __metadata("design:type", Object)
], CreatePersonArgs.prototype, _b, void 0);
CreatePersonArgs = __decorate([
    type_graphql_1.ArgsType()
], CreatePersonArgs);
exports.CreatePersonArgs = CreatePersonArgs;
let ConfirmPersonArgs = class ConfirmPersonArgs {
};
_c = session_interface_1.verificationCode;
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", Object)
], ConfirmPersonArgs.prototype, _c, void 0);
ConfirmPersonArgs = __decorate([
    type_graphql_1.ArgsType()
], ConfirmPersonArgs);
exports.ConfirmPersonArgs = ConfirmPersonArgs;
//# sourceMappingURL=person.dto.js.map