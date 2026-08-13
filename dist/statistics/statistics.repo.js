"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsRepo = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../database/db");
let StatisticsRepo = class StatisticsRepo {
    async getOrganizationsStatistics() {
        const organizationss = await new Promise((0, db_1.db1)("organizations").count("id as count").first());
        return {
            organizations: (0, db_1.db1)("organizations").select("*"),
            total_organizations: Number(organizationss.count),
        };
    }
    async getTaskStatistics() {
        const tasks = await new Promise((0, db_1.db1)("tasks").count("id as count").first());
        return {
            tasks: (0, db_1.db1)("tasks").select("*"),
            total_tasks: Number(tasks.count),
        };
    }
    async getOverallstatistics() {
        const [organizationss, projectss, taskss] = await Promise.all([
            (0, db_1.db1)("organizations").count("id as count").first(),
            (0, db_1.db1)("projects").count("id as count").first(),
            (0, db_1.db1)("tasks").count("id as count").first(),
        ]);
        return {
            total_organizations: Number(organizationss.count),
            total_projects: Number(projectss.count),
            total_tasks: Number(taskss.count),
        };
    }
};
exports.StatisticsRepo = StatisticsRepo;
exports.StatisticsRepo = StatisticsRepo = __decorate([
    (0, common_1.Injectable)()
], StatisticsRepo);
//# sourceMappingURL=statistics.repo.js.map