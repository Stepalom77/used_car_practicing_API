"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBOptions = void 0;
const _DBOptions = {
    type: "sqlite",
    entities: [__dirname + '/**/*.entity{.js,.ts}'],
    synchronize: true,
    migrations: [__dirname + "/migrations/*.js"]
};
switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(_DBOptions, {
            type: 'sqlite',
            database: 'db.sqlite',
        });
        break;
    case 'test':
        Object.assign(_DBOptions, {
            type: 'sqlite',
            database: 'test.sqlite',
            migrationsRun: true,
        });
        break;
    case 'production':
        break;
    default:
        throw new Error('unknown environment');
}
exports.DBOptions = _DBOptions;
//# sourceMappingURL=db.datasourceoptions.js.map