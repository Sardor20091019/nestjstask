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
    isadminornotID: number,
    data: {
      title: string;
      created_by: number;
      created_at?: Date;
      project_id: number;
      due_date: Date;
      worker_user_id: number;
      status?: TaskStatus;
      done_at?: Date;
    },
  ) {
    const requester = await db1("users").where({ id: isadminornotID }).first();

    if (!requester) {
      throw new NotFoundException(
        "Requester user not found, write ur user ID in HEADER section KEY shoudl be user-id and value should be your userID ",
      );
    }

    if (requester.role !== 1) {
      throw new ForbiddenException("Only admins can create users");
    }
    const taskData = {
      ...data,
      status: TaskStatus.CREATED,
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

  async findByProject(projectId: number) {
    return await this.tasksRepo.findByProject(projectId);
  }

  async updateStatus(id: number, status: TaskStatus) {
    return this.tasksRepo.updateStatus(id, status);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.tasksRepo.remove(id);
  }
}
