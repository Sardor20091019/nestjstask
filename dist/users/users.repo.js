"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepo = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../database/db");
let UsersRepo = class UsersRepo {
    async create(data) {
        const [user] = await (0, db_1.db1)("users").insert(data).returning("*");
        return user;
    }
    async findAll() {
        return await (0, db_1.db1)("users").select("*");
    }
    async findOne(id) {
        return await (0, db_1.db1)("users").where({ id }).first();
    }
    async update(id, data) {
        const [updatedUser] = await (0, db_1.db1)("users")
            .where({ id })
            .update(data)
            .returning("*");
        return updatedUser;
    }
    async remove(id) {
        await (0, db_1.db1)("users").where({ id }).delete();
        return true;
    }
};
exports.UsersRepo = UsersRepo;
exports.UsersRepo = UsersRepo = __decorate([
    (0, common_1.Injectable)()
], UsersRepo);
//# sourceMappingURL=users.repo.js.map