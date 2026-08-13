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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const tasks_repo_1 = require("./tasks.repo");
const task_status_enum_1 = require("../enum/task-status.enum");
let TasksService = class TasksService {
    constructor(tasksRepo) {
        this.tasksRepo = tasksRepo;
    }
    async create(data) {
        const taskData = {
            ...data,
            status: data.status || task_status_enum_1.TaskStatus.CREATED,
        };
        return this.tasksRepo.insert(taskData);
    }
    async findByWorker(workerUserId) {
        return this.tasksRepo.findByWorker(workerUserId);
    }
    async findByTask() {
        return this.tasksRepo.findByTask();
    }
    async findByStatus(status) {
        return this.tasksRepo.findByStatus(status);
    }
    async findAll() {
        return await this.tasksRepo.findAll();
    }
    async findOne(id) {
        const task = await this.tasksRepo.findById(id);
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }
    async findByProject(id) {
        const task = await this.tasksRepo.findByProject();
        if (!task) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        return task;
    }
    async updateStatus(id, status) {
        return this.tasksRepo.updateStatus(id, status);
    }
    async remove(id) {
        await this.findOne(id);
        return this.tasksRepo.remove(id);
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tasks_repo_1.TasksRepo])
], TasksService);
//# sourceMappingURL=tasks.service.js.map