"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db2 = exports.db1 = void 0;
const knex_1 = require("knex");
require("dotenv/config");
exports.db1 = (0, knex_1.default)({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
    },
    pool: {
        min: 2,
        max: 10,
    },
});
exports.db2 = exports.db1;
//# sourceMappingURL=db.js.map