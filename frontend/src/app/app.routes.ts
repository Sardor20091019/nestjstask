import { Routes } from "@angular/router";
import { ApiWorkbenchComponent } from "./features/workbench/api-workbench.component";

const workbench = (
  title: string,
  description: string,
  operations: { label: string; path: string; body: string; note?: string }[],
  listPath?: string,
) => ({
  component: ApiWorkbenchComponent,
  data: { workbench: { title, description, operations, listPath } },
});

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./features/dashboard/dashboard.component").then(
        (m) => m.DashboardComponent,
      ),
    title: "Dashboard · Astro_Spectrum",
  },
  {
    path: "tasks/list",
    loadComponent: () =>
      import("./features/tasks/task-list.component").then(
        (m) => m.TaskListComponent,
      ),
    title: "Tasks · Astro_Spectrum",
  },
  {
    path: "users",
    title: "Users · Astro_Spectrum",
    ...workbench(
      "Users",
      "Create and manage accounts. Create requires an administrator user_id in the header.",
      [
        {
          label: "Create user",
          path: "/users/create",
          body: '{\n  "name": "sardor",\n  "role": 3\n}',
        },
        {
          label: "Find all users",
          path: "/users/findall",
          body: '{\n  "name": "",\n  "page": 1,\n  "limit": 10\n}',
        },
        {
          label: "Find by name",
          path: "/users/findbyitsname",
          body: '{\n  "name": "sardor"\n}',
        },
        { label: "Find one", path: "/users/findone", body: '{\n  "id": 1\n}' },
        {
          label: "Update user",
          path: "/users/update",
          body: '{\n  "id": 1,\n  "name": "sarddor",\n  "role": 1\n}',
        },
        {
          label: "Remove user",
          path: "/users/remove",
          body: '{\n  "id": 4\n}',
        },
      ],
    ),
  },
  {
    path: "organizations",
    title: "Organizations · Astro_Spectrum",
    ...workbench(
      "Organizations",
      "Manage organizations and membership. Mutating operations require an admin or manager user_id.",
      [
        {
          label: "Create organization",
          path: "/organizations/create",
          body: '{\n  "name": "very amazing organization",\n  "created_by": 1\n}',
        },
        {
          label: "Find all organizations",
          path: "/organizations/findall",
          body: '{\n  "name": "",\n  "page": 1,\n  "limit": 10\n}',
        },
        {
          label: "Find by name",
          path: "/organizations/findbyitsname",
          body: '{\n  "name": "org"\n}',
        },
        {
          label: "Find one",
          path: "/organizations/findone",
          body: '{\n  "id": 1\n}',
        },
        {
          label: "Update organization",
          path: "/organizations/update",
          body: '{\n  "id": 1,\n  "name": "Acme Group"\n}',
        },
        {
          label: "Assign user",
          path: "/organizations/assign-user",
          body: '{\n  "id": 1,\n  "userId": 2\n}',
        },
        {
          label: "Remove organization",
          path: "/organizations/remove",
          body: '{\n  "id": 2\n}',
        },
      ],
    ),
  },
  {
    path: "projects",
    title: "Projects · Astro_Spectrum",
    ...workbench(
      "Projects",
      "Organize work by organization. The update route follows the documented path parameter format.",
      [
        {
          label: "Create project",
          path: "/projects/create",
          body: '{\n  "name": "amazing project",\n  "org_id": 1,\n  "created_by": 1\n}',
        },
        {
          label: "Find all projects",
          path: "/projects/findall",
          body: '{\n  "name": "",\n  "page": 1,\n  "limit": 10\n}',
        },
        {
          label: "Find by name",
          path: "/projects/findbyitsname",
          body: '{\n  "name": "amazing"\n}',
        },
        {
          label: "Find by organization",
          path: "/projects/findByOrg",
          body: '{\n  "org_id": 1\n}',
        },
        {
          label: "Update project",
          path: "/projects/update/1",
          body: '{\n  "id": 1,\n  "name": "Website v2"\n}',
        },
        {
          label: "Remove project",
          path: "/projects/remove",
          body: '{\n  "id": 2\n}',
        },
      ],
    ),
  },
  {
    path: "tasks",
    title: "Tasks · Astro_Spectrum",
    ...workbench(
      "Tasks",
      "Create, filter, complete, and remove tasks. Use the task table for a compact searchable list.",
      [
        {
          label: "Create task",
          path: "/tasks/create",
          body: '{\n  "title": "veryeasytask",\n  "project_id": 1,\n  "worker_user_id": 2,\n  "due_date": "2026-08-20T12:00:00Z"\n}',
        },
        {
          label: "Find all tasks",
          path: "/tasks/findall",
          body: '{\n  "title": "",\n  "page": 1,\n  "limit": 10\n}',
        },
        {
          label: "Find by title",
          path: "/tasks/findbyitstitle",
          body: '{\n  "title": "task"\n}',
        },
        {
          label: "Find by worker",
          path: "/tasks/findByWorker",
          body: '{\n  "worker_user_id": 2\n}',
        },
        {
          label: "Employee summary",
          path: "/tasks/employee-tasks",
          body: '{\n  "worker_user_id": 2\n}',
        },
        {
          label: "Employee task counts",
          path: "/tasks/employee-tasks-count",
          body: '{\n  "worker_user_id": 2\n}',
        },
        {
          label: "Find by project",
          path: "/tasks/findByProject",
          body: '{\n  "project_id": 1\n}',
        },
        {
          label: "Find by status",
          path: "/tasks/status",
          body: '{\n  "status": "DONE"\n}',
        },
        {
          label: "Find one task",
          path: "/tasks/findone",
          body: '{\n  "id": 1\n}',
        },
        {
          label: "Update status",
          path: "/tasks/update-status",
          body: '{\n  "id": 1,\n  "status": "DONE",\n  "worker_user_id": 2\n}',
        },
        {
          label: "Remove task",
          path: "/tasks/remove",
          body: '{\n  "id": 1\n}',
        },
      ],
      "/tasks/list",
    ),
  },
  {
    path: "statistics",
    title: "Statistics · Astro_Spectrum",
    ...workbench(
      "Statistics",
      "Read-only reporting for organizations, projects, and task volume.",
      [
        {
          label: "Overall statistics",
          path: "/statistics/overallstatistics",
          body: "{}",
        },
        {
          label: "Organization statistics",
          path: "/statistics/organizations",
          body: "{}",
        },
        {
          label: "Project task statistics",
          path: "/statistics/tasks",
          body: "{}",
        },
      ],
    ),
  },
  { path: "**", redirectTo: "" },
];
