"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db2 = exports.db1 = void 0;
const knex_1 = __importDefault(require("knex"));
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