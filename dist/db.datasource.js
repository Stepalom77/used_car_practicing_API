"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const db_datasourceoptions_1 = require("./db.datasourceoptions");
const typeorm_1 = require("typeorm");
const dsOptions = {};
Object.assign(dsOptions, db_datasourceoptions_1.DBOptions);
const _AppDataSource = new typeorm_1.DataSource(dsOptions);
_AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
exports.AppDataSource = _AppDataSource;
//# sourceMappingURL=db.datasource.js.map