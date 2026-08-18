import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { db1 } from "../database/db";
import { TaskStatus } from "../enum/task-status.enum";

@Injectable()
export class TasksRepo {
  async updateStatus(id: number, status: TaskStatus, workerUserId: number) {
    const done_at = status === "DONE" ? db1.fn.now() : null;

    const [updated] = await db1("tasks")
      .where({ id, worker_user_id: workerUserId })
      .update({ status: status, done_at: done_at })
      .returning("*");

    return updated;
  }
  async findById(id: number) {
    return db1("tasks").where({ id }).first();
  }
  async insert(data: {
    title?: string;
    created_by: number;
    project_id: number;
    due_date: Date;
    worker_user_id: number;
    status?: string;
    created_at?: Date;
    done_at?: Date;
  }) {
    const [task] = await db1("tasks")
      .insert({
        ...data,
        status: "CREATED",
      })
      .returning("*");
    return task;
  }

  async findByWorker(workerUserId: number) {
    return db1("tasks").where({ worker_user_id: workerUserId }).select("*");
  }

  async findByTask() {
    return await db1("tasks").select("id");
  }

  async findByStatus(status: string) {
    return await db1("tasks").where({ status });
  }

  async findByProject(projectId: number) {
    if (!projectId) {
      throw new BadRequestException("Project ID is required");
    }

    const tasks = await db1("tasks")
      .where({ project_id: projectId })
      .select("*");

    if (!tasks || tasks.length === 0) {
      throw new NotFoundException(`No tasks found for project ID ${projectId}`);
    }

    return tasks;
  }
  async findAll() {
    return db1("tasks").select("*");
  }
  async getEmployeeTasksSummary(workerUserId: number) {
    if (!workerUserId || isNaN(workerUserId)) {
      throw new NotFoundException("Valid worker_user_id is required");
    }

    const employee = await db1("users").where({ id: workerUserId }).first();
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${workerUserId} not found`);
    }

    const tasks = await db1("tasks").where({ worker_user_id: workerUserId });

    const categorized = {
      new: [],
      in_progress: [],
      completed: [],
      overdue: [],
    };

    for (const task of tasks) {
      const dueDate = task.due_date;
      const currentDate = new Date();
      const isOverdue = dueDate < currentDate && task.status !== "DONE";

      if (isOverdue) {
        categorized.overdue.push({
          id: task.id,
          title: task.title,
          deadline: task.due_date,
        });
      } else if (task.status === "DONE") {
        categorized.completed.push({
          id: task.id,
          title: task.title,
          completed_at: task.done_at,
        });
      } else if (task.status === "IN_PROCESS") {
        categorized.in_progress.push({
          id: task.id,
          title: task.title,
          deadline: task.due_date,
        });
      } else {
        categorized.new.push({
          id: task.id,
          title: task.title,
          deadline: task.due_date,
        });
      }
    }

    return {
      employee: {
        id: employee.id,
        name: employee.name,
      },
      tasks: categorized,
    };
  }
  async remove(id: number) {
    await db1("tasks").where({ id }).delete();
    return { deleted: true };
  }
  async getEmployeeTasksCountSummary(workerUserId: number) {
    if (!workerUserId || isNaN(workerUserId)) {
      throw new NotFoundException("Valid worker_user_id is required");
    }

    const employee = await db1("users").where({ id: workerUserId }).first();
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${workerUserId} not found`);
    }

    const tasks = await db1("tasks").where({ worker_user_id: workerUserId });

    const counts = {
      new: 0,
      in_progress: 0,
      completed: 0,
      overdue: 0,
    };

    for (const task of tasks) {
      const dueDate = task.due_date;
      const currentDate = new Date();
      const isOverdue =
        dueDate && dueDate < currentDate && task.status !== "DONE";

      if (isOverdue) {
        counts.overdue++;
      } else if (task.status === "DONE") {
        counts.completed++;
      } else if (task.status === "IN_PROCESS") {
        counts.in_progress++;
      } else {
        counts.new++;
      }
    }

    const total =
      counts.new + counts.in_progress + counts.completed + counts.overdue;

    return {
      employeeId: employee.id,
      tasks: counts,
      total,
    };
  }
}
