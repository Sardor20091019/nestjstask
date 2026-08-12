"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksRepo = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../database/db");
let TasksRepo = class TasksRepo {
    async updateStatus(id, status) {
        const updateData = { status };
        if (status === "DONE") {
            updateData.done_at = db_1.db1.fn.now();
        }
        else {
            updateData.done_at = null;
        }
        const [updated] = await (0, db_1.db1)("tasks")
            .where({ id })
            .update(updateData)
            .returning("*");
        return updated;
    }
    async findById(id) {
        return (0, db_1.db1)("tasks").where({ id }).first();
    }
    async insert(data) {
        const [task] = await (0, db_1.db1)("tasks")
            .insert({
            ...data,
            status: data.status || "CREATED",
        })
            .returning("*");
        return task;
    }
    async findByWorker(workerUserId) {
        return (0, db_1.db1)("tasks").where({ worker_user_id: workerUserId }).select("*");
    }
    async findByTask() {
        return await (0, db_1.db1)("tasks").select("id");
    }
    async findByStatus(status) {
        return await (0, db_1.db1)("tasks").where({ status });
    }
    async findByProject() {
        return await (0, db_1.db1)("tasks").select("project_id");
    }
    async findAll() {
        return (0, db_1.db1)("tasks").select("*");
    }
    async remove(id) {
        await (0, db_1.db1)("tasks").where({ id }).delete();
        return { deleted: true };
    }
};
exports.TasksRepo = TasksRepo;
exports.TasksRepo = TasksRepo = __decorate([
    (0, common_1.Injectable)()
], TasksRepo);
//# sourceMappingURL=tasks.repo.js.map