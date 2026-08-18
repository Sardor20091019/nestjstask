import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { TasksRepo } from "./tasks.repo";
import { TaskStatus } from "../enum/task-status.enum";
import { db1 } from "../database/db";

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepo: TasksRepo) {}

  async create(
    userId: number,
    data: {
      title: string;
      project_id: number;
      due_date: Date;
      worker_user_id: number;
    },
  ) {
    const requester = await db1("users").where({ id: userId }).first();

    if (!requester) {
      throw new NotFoundException(
        "Requester user not found via user_id header",
      );
    }
    if (requester.role !== 1 && requester.role !== 2) {
      throw new ForbiddenException("Only admins and managers can create tasks");
    }

    const taskData = {
      ...data,
      created_by: requester.id,
      status: TaskStatus.CREATED,
    };
    return this.tasksRepo.insert(taskData);
  }

  async findByWorker(workerUserId: number) {
    return this.tasksRepo.findByWorker(workerUserId);
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
      throw new NotFoundException(`task you;re looking for, which is ${id}, isnt found in hte database, therefoer it either already deleted or hasnt created yet`);
    }
    return task;
  }

  async findByProject(projectId: number) {
    return await this.tasksRepo.findByProject(projectId);
  }

  async updateStatus(userId: number, id: number, status: TaskStatus) {

    const updateData: any = { status };
    if (status === TaskStatus.DONE) {
      updateData.done_at = new Date();
    } else {
      updateData.done_at = null;
    }

    return db1("tasks").where({ id }).update(updateData).returning("*");
  }
  async getEmployeeTasksSummary(workerUserId: number) {
    return this.tasksRepo.getEmployeeTasksSummary(workerUserId);
  }
  async getEmployeeTasksCountSummary(workerUserId: number) {
    return this.tasksRepo.getEmployeeTasksCountSummary(workerUserId);
  }
  async remove(userId: number, id: number) {
    const requester = await db1("users").where({ id: userId }).first();
    if (!requester) {
      throw new NotFoundException(
        "Requester user not found via user_id header",
      );
    }

    if (requester.role !== 1 && requester.role !== 2) {
      throw new ForbiddenException("Only admins and managers can delete tasks");
    }

    await this.findOne(id);
    return this.tasksRepo.remove(id);
  }
}
