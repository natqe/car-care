"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.Session = common_1.createParamDecorator((_, [, , { session }]) => session);
//# sourceMappingURL=session.decorator.js.map