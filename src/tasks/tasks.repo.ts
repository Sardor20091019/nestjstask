import { Injectable } from '@nestjs/common';
import { db1 } from '../database/db';

@Injectable()
export class TasksRepo {
  async updateStatus(id: number, status: string) {
    const updateData: { status: string; done_at?: any } = { status };

    if (status === 'DONE') {
      updateData.done_at = db1.fn.now();
    } else {
      updateData.done_at = null;
    }

    const [updated] = await db1('tasks')
      .where({ id })
      .update(updateData)
      .returning('*');

    return updated;
  }
  async findById(id: number) {
    return db1('tasks').where({ id }).first();
  }
  async insert(data: {
    title?: string;
    created_by: number;
    project_id: number;
    due_date: Date;
    worker_user_id: number;
    status?: string;
    created_at?: number | Date;
    done_at?: Date;
  }) {
    const [task] = await db1('tasks')
      .insert({
        ...data,
        status: data.status || 'CREATED',
      })
      .returning('*');
    return task;
  }

  async findByWorker(workerUserId: number) {
    return db1('tasks').where({ worker_user_id: workerUserId }).select('*');
  }

  async findByTask() {
    return await db1('tasks').select('id');
  }

  async findByStatus(status: string) {
    return await db1('tasks').where({ status });
  }

  async findByProject() {
    return await db1('tasks').select('project_id');
  }

  async findAll() {
    return db1('tasks').select('*');
  }

  async remove(id: number) {
    await db1('tasks').where({ id }).delete();
    return { deleted: true };
  }
}
