"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationsRepo = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../database/db");
let OrganizationsRepo = class OrganizationsRepo {
    async insert(data) {
        const [org] = await (0, db_1.db1)("organizations").insert(data).returning("*");
        return org;
    }
    async findAll() {
        return (0, db_1.db1)("organizations").select("*");
    }
    async findById(id) {
        return (0, db_1.db1)("organizations").where({ id }).first();
    }
    async update(id, data) {
        const [updated] = await (0, db_1.db1)("organizations")
            .where({ id })
            .update(data)
            .returning("*");
        return updated;
    }
    async remove(id) {
        await (0, db_1.db1)("organizations").where({ id }).delete();
        return { deleted: true };
    }
    async assignUser(orgId, userId) {
        const [assign] = await (0, db_1.db1)("organization_user")
            .insert({ org_id: orgId, user_id: userId })
            .returning("*");
        return assign;
    }
};
exports.OrganizationsRepo = OrganizationsRepo;
exports.OrganizationsRepo = OrganizationsRepo = __decorate([
    (0, common_1.Injectable)()
], OrganizationsRepo);
//# sourceMappingURL=organizations.repo.js.map