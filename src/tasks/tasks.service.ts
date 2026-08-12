import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepo } from './tasks.repo';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepo: TasksRepo) {}

  async create(data: {
    title: string;
    created_by: number;
    created_at: number;
    project_id: number;
    due_date: Date;
    worker_user_id: number;
    status: 'CREATED' | 'IN_PROCESS' | 'DONE';
    done_at: Date;
  }): Promise<unknown> {
    return this.tasksRepo.insert(data) as Promise<unknown>;
  }
  async findByWorker(workerUserId: number) {
    return this.tasksRepo.findByWorker(workerUserId);
  }

  async findByTask() {
    return this.tasksRepo.findByTask();
  }
  async findByStatus(status: string) {
    return this.tasksRepo.findByStatus(status);
  }
  async findAll() {
    try {
      return await this.tasksRepo.findAll();
    } catch (error) {
      console.error('CRASH ERROR:', error);
      throw error;
    }
  }
  async findOne(id: number): Promise<unknown> {
    const task = (await this.tasksRepo.findById(id)) as Promise<unknown>;
    if (!task) {
      throw new NotFoundException(`task with ID ${id} not found`);
    }
    return task;
  }
  async findByProject(id: number) {
    const task = await this.tasksRepo.findByProject();
    if (!task) {
      throw new NotFoundException(
        `that project id inst foiund therefore there mustnt be one there`,
      );
    }
  }
  async updateStatus(id: number, status: string) {
    await this.findOne(id);
    return this.tasksRepo.updateStatus(id, status);
  }
  async remove(id: number) {
    await this.findOne(id);
    return this.tasksRepo.remove(id);
  }
}
