export type TaskStatus =
  "CREATED" | "IN_PROCESS" | "DONE" | "COMPLETED" | "IN_PROGRESS";

export interface User {
  id: number;
  name: string;
  role: number;
}
export interface Organization {
  id: number;
  name: string;
  created_by: number;
}
export interface Project {
  id: number;
  name: string;
  org_id: number;
  created_by: number;
}
export interface Task {
  id: number;
  title: string;
  project_id: number;
  worker_user_id: number;
  status: TaskStatus;
  due_date: string;
}

export type CreateUser = Pick<User, "name" | "role">;
export type UpdateUser = { id: number; name?: string; role?: number };
export type CreateOrganization = Pick<Organization, "name" | "created_by">;
export type UpdateOrganization = { id: number; name: string };
export type CreateProject = Pick<Project, "name" | "org_id" | "created_by">;
export type UpdateProject = { id: number; name: string };
export type CreateTask = Pick<
  Task,
  "title" | "project_id" | "worker_user_id" | "due_date"
>;

export interface PageRequest {
  page: number;
  limit: number;
}
export interface PageResponse<T> {
  data: T[];
  paginationinfo: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export type TaskSummaryStatus = "new" | "in_progress" | "completed" | "overdue";
export interface EmployeeTaskSummary {
  employee: Pick<User, "id" | "name">;
  tasks: Record<
    TaskSummaryStatus,
    Array<
      Pick<Task, "id" | "title"> & { deadline?: string; completed_at?: string }
    >
  >;
}
