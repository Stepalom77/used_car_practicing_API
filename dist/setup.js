"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const path_1 = require("path");
global.beforeEach(async () => {
    try {
        await (0, promises_1.rm)((0, path_1.join)(__dirname, '..', 'test.sqlite'));
    }
    catch (err) {
    }
});
//# sourceMappingURL=setup.js.map