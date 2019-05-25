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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const numeric_code_1 = require("utilizes/numeric-code");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const main_abstract_entity_1 = require("../database/main.abstract-entity");
const session_decorator_1 = require("../session/session.decorator");
const session_interface_1 = require("../session/session.interface");
const person_dto_1 = require("./person.dto");
const person_entity_1 = require("./person.entity");
let PersonResolver = class PersonResolver {
    isConfirmPerson(session) {
        return session[session_interface_1.ESession.personId] && !session[session_interface_1.ESession.verificationCode];
    }
    createPerson(phoneData, session) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!session[session_interface_1.ESession.personId])
                session[session_interface_1.ESession.personId] = lodash_1.get(yield person_entity_1.Person.findOne(phoneData, { select: [main_abstract_entity_1.EMain._id] }), main_abstract_entity_1.EMain._id) ||
                    lodash_1.get(yield person_entity_1.Person.create(phoneData).save(), main_abstract_entity_1.EMain._id);
            session[session_interface_1.ESession.verificationCode] = numeric_code_1.numericCode();
            return !!session[session_interface_1.ESession.personId];
        });
    }
    confirmPerson({ verificationCode }, session) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(session);
            const isConfirm = this.isConfirmPerson(session) || session[session_interface_1.ESession.verificationCode] === verificationCode;
            if (isConfirm)
                delete session[session_interface_1.ESession.verificationCode];
            return isConfirm;
        });
    }
};
__decorate([
    graphql_1.Query(() => Boolean, { nullable: true }),
    __param(0, session_decorator_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonResolver.prototype, "isConfirmPerson", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args()), __param(1, session_decorator_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [person_dto_1.CreatePersonArgs, Object]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "createPerson", null);
__decorate([
    graphql_1.Mutation(() => Boolean, { nullable: true }),
    __param(0, graphql_1.Args()), __param(1, session_decorator_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [person_dto_1.ConfirmPersonArgs, Object]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "confirmPerson", null);
PersonResolver = __decorate([
    graphql_1.Resolver(() => person_entity_1.Person)
], PersonResolver);
exports.PersonResolver = PersonResolver;
//# sourceMappingURL=person.resolver.js.map