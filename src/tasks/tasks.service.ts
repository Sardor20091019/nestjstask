import { Injectable, NotFoundException } from "@nestjs/common";
import { TasksRepo } from "./tasks.repo";
import { TaskStatus } from "../enum/task-status.enum";

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepo: TasksRepo) {}

  async create(data: {
    title: string;
    created_by: number;
    created_at?: Date;
    project_id: number;
    due_date: Date;
    worker_user_id: number;
    status?: TaskStatus;
    done_at?: Date;
  }) {
    const taskData = {
      ...data,
      status: data.status || TaskStatus.CREATED,
    };
    return this.tasksRepo.insert(taskData);
  }

  async findByWorker(workerUserId: number) {
    return this.tasksRepo.findByWorker(workerUserId);
  }

  async findByTask() {
    return this.tasksRepo.findByTask();
  }

  async findByStatus(status: TaskStatus) {
    return this.tasksRepo.findByStatus(status);
  }

  async findAll() {
    return await this.tasksRepo.findAll();
  }

  async findOne(id: number) {
    const task = await this.tasksRepo.findById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async findByProject(id: number) {
    const task = await this.tasksRepo.findByProject();
    if (!task) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return task;
  }

  async updateStatus(id: number, status: TaskStatus) {
    await this.findOne(id);

    const updatePayload: any = { status };
    if (status === TaskStatus.DONE) {
      updatePayload.done_at = new Date();
    }

    return this.tasksRepo.updateStatus(id, updatePayload);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.tasksRepo.remove(id);
  }
}
