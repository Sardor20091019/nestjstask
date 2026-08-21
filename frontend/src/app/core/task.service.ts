import { Injectable, inject } from "@angular/core";
import { ApiService } from "./api.service";
import { PageResponse, Task } from "./models";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class TaskService {
  private readonly api = inject(ApiService);

  findAll(
    title?: string,
    options?: { page?: number; limit?: number; status?: string | string[] },
  ): Observable<PageResponse<Task>> {
    const body: any = {
      title: title || "",
      page: options?.page || 1,
      limit: options?.limit || 10,
    };

    if (options?.status) {
      if (typeof options.status === "string" && options.status.trim() !== "") {
        body.status = options.status;
      } else if (Array.isArray(options.status) && options.status.length > 0) {
        body.status = options.status;
      }
    }

    return this.api.post<PageResponse<Task>, any>("/tasks/findall", body);
  }

  // Find by ID method for the frontend detail page
  findById(id: number): Observable<Task> {
    return this.findOne({ id });
  }

  findOne(body: { id: number }): Observable<Task> {
    return this.api.post<Task, { id: number }>("/tasks/findone", body);
  }

  getEmployeeTasksCountSummary(body: { worker_user_id?: number }): Observable<any> {
    return this.api.post<any, any>("/tasks/employee-tasks-count", body);
  }

  getEmployeeTasksSummary(body: { worker_user_id?: number }): Observable<any> {
    return this.api.post<any, any>("/tasks/employee-tasks", body);
  }

  createTask(body: {
    title: string;
    project_id: number;
    worker_user_id: number;
    due_date: string;
  }): Observable<any> {
    return this.api.post<any, any>("/tasks/create", body);
  }

  updateStatus(body: {
    id: number;
    status: string;
    worker_user_id: string | number;
  }): Observable<any> {
    return this.api.post<any, any>("/tasks/update-status", body);
  }

  remove(body: { id: number }): Observable<any> {
    return this.api.post<any, any>("/tasks/remove", body);
  }
}