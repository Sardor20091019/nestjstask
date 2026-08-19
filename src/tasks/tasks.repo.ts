import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { db1 } from "../database/db";
import { TaskStatus } from "../enum/task-status.enum";

@Injectable()
export class TasksRepo {
  async updateStatus(userId: number, id: number, status: TaskStatus) {
    const requester = await db1("users").where({ id: userId }).first();
    if (!requester) {
      throw new NotFoundException(
        "Requester user not found via user_id header",
      );
    }

    const task = await this.findById(id);

    if (requester.role === 3) {
      if (task.worker_user_id !== userId) {
        throw new ForbiddenException(
          "Employees can only update their own assigned tasks",
        );
      }
    } else if (requester.role === 2) {
      throw new ForbiddenException(
        "You are Manager, therefore you cant do tasks, tasks are only for employees, if you still have tasks attached to your account you should assign them to employees",
      );
    } else if (requester.role === 1) {
      throw new ForbiddenException(
        "Yuo are Admin, therefore you can't do tasks , tasks are only for empployees, if you still have tasks attached to your account you should assign them to employees",
      );
    }

    const tasktocheckdeadline = await db1("tasks")
      .where({ id: id, worker_user_id: task.worker_user_id })
      .first();

    const dueDate = tasktocheckdeadline.due_date;
    const currentDate = new Date();
    const isOverdue = dueDate < currentDate;

    if (isOverdue) {
      throw new ForbiddenException(
        "it is already passed a deadline, therefore you can't update its status, you should've tried earlier",
      );
    }
    const updateData: any = { status };
    if (
      status !== TaskStatus.DONE &&
      status !== TaskStatus.CREATED &&
      status !== TaskStatus.IN_PROCESS
    ) {
      throw new ForbiddenException(
        "status only can be DONE/CREATED/IN_PROCESS and nothing else",
      );
    }
    if (status === TaskStatus.DONE) {
      updateData.done_at = new Date();
    } else {
      updateData.done_at = null;
    }

    return db1("tasks").where({ id }).update(updateData).returning("*");
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
    const createdAt = data.created_at ? new Date(data.created_at) : new Date();
    const dueDate = new Date(data.due_date);
    const mindifferenceinms = 60 * 60 * 24 * 1000;
    const differencebetweendays = dueDate.getTime() - createdAt.getTime();
    const isdifferencemorethanaday = differencebetweendays >= mindifferenceinms;
    if (!isdifferencemorethanaday) {
      throw new BadRequestException(
        "minimum difference between due_date and createdat should be at least a day which is 86400 secs",
      );
    }
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

    if (!tasks) {
      throw new NotFoundException(`No tasks found for project ID ${projectId}`);
    }

    return tasks;
  }
  async findAll(body: { name?: string; page?: number; limit?: number }) {
    const page = body.page || 1;
    const limit = body.limit || 10;
    const offset = (page - 1) * limit;

    const query = db1("tasks");

    if (body.name) {
      query.whereILike("name", `%${body.name}%`);
    }

    const data = await query.clone().limit(limit).offset(offset);
    const countResult = await query.clone().count("id as count").first();
    const total = countResult ? Number(countResult.count) : 0;

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async remove(id: number) {
    await db1("tasks").where({ id }).delete();
    return { deleted: true };
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
      const isOverdue = dueDate < currentDate && task.status !== "DONE";

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
  async findbyitstitle(title?: string) {
    const findthem = db1("tasks");

    if (title) {
      findthem.whereILike("title", `%${title}%`);
    }

    return findthem;
  }
}
