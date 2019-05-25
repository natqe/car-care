"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const connectPgSimple = require("connect-pg-simple");
const expressSession = require("express-session");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
core_1.NestFactory.create(app_module_1.AppModule).then(app => {
    const production = process.env.NODE_MODE === `production`, PGStore = connectPgSimple(expressSession);
    app.
        useGlobalPipes(new common_1.ValidationPipe()).
        enableCors({
        credentials: true,
        origin: true
    }).
        use(expressSession({
        store: new PGStore({
            ttl: 2 * 60 * 60 * 1000,
            conObject: {
                connectionString: process.env.DATABASE_URL,
                ssl: production
            }
        }),
        secret: 'dasddad',
        cookie: {
            maxAge: 2 * 60 * 60 * 1000,
            secure: production
        },
        resave: false,
        saveUninitialized: false
    })).
        listen(process.env.PORT);
});
//# sourceMappingURL=main.js.map