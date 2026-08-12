"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsRepo = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../database/db");
let ProjectsRepo = class ProjectsRepo {
    async insert(data) {
        const [project] = await (0, db_1.db1)('projects').insert(data).returning('*');
        return project;
    }
    async findAll() {
        return (0, db_1.db1)('projects').select('*');
    }
    async findByOrg(orgId) {
        return (0, db_1.db1)('projects').where({ org_id: orgId }).select('*');
    }
    async findById(id) {
        return (0, db_1.db1)('projects').where({ id }).first();
    }
    async update(id, data) {
        const [updated] = await (0, db_1.db1)('projects')
            .where({ id })
            .update(data)
            .returning('*');
        return updated;
    }
    async remove(id) {
        await (0, db_1.db1)('projects').where({ id }).delete();
        return { deleted: true };
    }
};
exports.ProjectsRepo = ProjectsRepo;
exports.ProjectsRepo = ProjectsRepo = __decorate([
    (0, common_1.Injectable)()
], ProjectsRepo);
//# sourceMappingURL=projects.repo.js.map