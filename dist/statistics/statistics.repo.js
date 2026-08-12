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
    async getOrganizations() {
        return await (0, db_1.db1)("organizations as o ")
            .select("*")
            .leftJoin;
    }
    async getTasks() {
        return await (0, db_1.db1)("projects as p")
            .select("*")
            .leftJoin;
    }
    async getOverallstatistics() {
        return await (0, db_1.db1)("statistics")
            .select("*");
    }
};
exports.StatisticsRepo = StatisticsRepo;
exports.StatisticsRepo = StatisticsRepo = __decorate([
    (0, common_1.Injectable)()
], StatisticsRepo);
//# sourceMappingURL=statistics.repo.js.map