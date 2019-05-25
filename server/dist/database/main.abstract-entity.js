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
var _a, _b, _c, _d, _e;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
var EMain;
(function (EMain) {
    EMain["_id"] = "_id";
    EMain["_createDate"] = "_createDate";
    EMain["_updateDate"] = "_updateDate";
    EMain["_version"] = "_version";
    EMain["_type"] = "_type";
})(EMain = exports.EMain || (exports.EMain = {}));
exports._createDate = EMain._createDate, exports._id = EMain._id, exports._type = EMain._type, exports._updateDate = EMain._updateDate, exports._version = EMain._version;
let Main = class Main extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this[_e] = this.constructor.name;
    }
};
_a = exports._id, _b = exports._createDate, _c = exports._updateDate, _d = exports._version, _e = exports._type;
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn(`uuid`),
    __metadata("design:type", String)
], Main.prototype, _a, void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Main.prototype, _b, void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Main.prototype, _c, void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.VersionColumn(),
    __metadata("design:type", Number)
], Main.prototype, _d, void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", Object)
], Main.prototype, _e, void 0);
Main = __decorate([
    type_graphql_1.ObjectType()
], Main);
exports.Main = Main;
//# sourceMappingURL=main.abstract-entity.js.map