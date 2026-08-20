import { Injectable, inject } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({ providedIn: "root" })
export class TaskService {
  private readonly api = inject(ApiService);

  findAll(
    title?: string,
    options?: { page?: number; limit?: number; status?: string[] },
  ) {
    const body: any = {
      title: title || "",
      page: options?.page || 1,
      limit: options?.limit || 10,
    };

    if (options?.status && options.status.length > 0) {
      body.status = options.status[0];
    }

    return this.api.post<any, any>("/tasks/findall", body);
  }

  getEmployeeTasksCountSummary(body: { worker_user_id?: number }) {
    return this.api.post<any, any>("/tasks/employee-tasks-count", body);
  }

  getEmployeeTasksSummary(body: { worker_user_id?: number }) {
    return this.api.post<any, any>("/tasks/employee-tasks", body);
  }

  createTask(body: {
    title: string;
    project_id: number;
    worker_user_id: number;
    due_date: string;
  }) {
    return this.api.post<any, any>("/tasks/create", body);
  }

  // Updated to match your backend body requirements: { id, status, worker_user_id }
  updateStatus(body: { id: number; status: string; worker_user_id: string | number }) {
    return this.api.post<any, any>("/tasks/update-status", body);
  }

  remove(body: { id: number }) {
    return this.api.post<any, any>("/tasks/remove", body);
  }

  findOne(body: { id: number }) {
    return this.api.post<any, any>("/tasks/findone", body);
  }
}