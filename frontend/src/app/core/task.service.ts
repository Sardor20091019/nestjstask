import { Injectable, inject } from "@angular/core";
import { ApiService } from "./api.service";
import {
  CreateTask,
  EmployeeTaskSummary,
  PageRequest,
  PageResponse,
  Task,
  TaskStatus,
} from "./models";

@Injectable({ providedIn: "root" })
export class TaskService {
  private readonly api = inject(ApiService);

  findAll(title: string, page: PageRequest) {
    return this.api.post<PageResponse<Task>, { title: string } & PageRequest>(
      "/tasks/findall",
      { title, ...page },
    );
  }

  employeeTasks(workerUserId: number) {
    return this.api.post<EmployeeTaskSummary, { worker_user_id: number }>(
      "/tasks/employee-tasks",
      {
        worker_user_id: workerUserId,
      },
    );
  }

  employeeTaskCounts(worker_user_id: number) {
    return this.api.post<
      {
        employeeId: number;
        tasks: Record<"new" | "in_progress" | "completed" | "overdue", number>;
        total: number;
      },
      { worker_user_id: number }
    >("/tasks/employee-tasks-count", { worker_user_id });
  }

  create(body: CreateTask) {
    return this.api.post<Task, CreateTask>("/tasks/create", body);
  }
  findByTitle(title: string) {
    return this.api.post<Task[], { title: string }>("/tasks/findbyitstitle", {
      title,
    });
  }
  findOne(id: number) {
    return this.api.post<Task, { id: number }>("/tasks/findone", { id });
  }
  findByWorker(worker_user_id: number) {
    return this.api.post<Task[], { worker_user_id: number }>(
      "/tasks/findByWorker",
      { worker_user_id },
    );
  }
  findByProject(project_id: number) {
    return this.api.post<Task[], { project_id: number }>(
      "/tasks/findByProject",
      { project_id },
    );
  }
  findByStatus(status: TaskStatus) {
    return this.api.post<Task[], { status: TaskStatus }>("/tasks/status", {
      status,
    });
  }
  updateStatus(id: number, status: TaskStatus, worker_user_id?: number) {
    return this.api.post<
      Task[],
      { id: number; status: TaskStatus; worker_user_id?: number }
    >("/tasks/update-status", {
      id,
      status,
      ...(worker_user_id === undefined ? {} : { worker_user_id }),
    });
  }
  remove(id: number) {
    return this.api.post<{ deleted: boolean }, { id: number }>(
      "/tasks/remove",
      { id },
    );
  }
}
