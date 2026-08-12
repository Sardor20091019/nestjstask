"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const task_status_enum_1 = require("../enum/task-status.enum");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    create(body) {
        return this.tasksService.create({
            title: body.title,
            project_id: body.project_id,
            worker_user_id: body.worker_user_id,
            due_date: new Date(body.due_date),
            created_by: body.created_by,
            status: task_status_enum_1.TaskStatus.CREATED,
        });
    }
    findAll(workerUserId, projectId, status) {
        if (workerUserId) {
            return this.tasksService.findByWorker(+workerUserId);
        }
        if (projectId) {
            return this.tasksService.findByProject(+projectId);
        }
        if (status) {
            return this.tasksService.findByStatus(status);
        }
        return this.tasksService.findAll();
    }
    findByWorker(workerUserId) {
        return this.tasksService.findByWorker(workerUserId ? +workerUserId : 0);
    }
    findByProject(projectId) {
        return this.tasksService.findByProject(projectId ? +projectId : 0);
    }
    status(status) {
        return this.tasksService.findByStatus(status);
    }
    updateStatus(id, body) {
        return this.tasksService.updateStatus(+id, body.status);
    }
    remove(id) {
        return this.tasksService.remove(+id);
    }
    findOne(id) {
        return this.tasksService.findOne(+id);
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("findall"),
    __param(0, (0, common_1.Query)("worker_user_id")),
    __param(1, (0, common_1.Query)("project_id")),
    __param(2, (0, common_1.Query)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)("findByWorker"),
    __param(0, (0, common_1.Query)("worker_user_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "findByWorker", null);
__decorate([
    (0, common_1.Post)("findByProject"),
    __param(0, (0, common_1.Query)("project_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "findByProject", null);
__decorate([
    (0, common_1.Post)("status"),
    __param(0, (0, common_1.Query)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "status", null);
__decorate([
    (0, common_1.Post)("updatestatus/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)("remove/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "findOne", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)("tasks"),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map