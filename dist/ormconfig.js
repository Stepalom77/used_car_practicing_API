"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbConfig = {};
switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'db.sqlite',
            entities: ['**/*.entity.js'],
            synchronize: false
        });
        break;
    case 'test':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'test.sqlite',
            entities: ['**/*.entity.ts'],
            synchronize: false
        });
        break;
    case 'production':
        break;
    default:
        throw new Error('unknown environment');
}
exports.default = dbConfig;
//# sourceMappingURL=ormconfig.js.map