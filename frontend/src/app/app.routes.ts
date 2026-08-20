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
  { path: "", redirectTo: "tasks", pathMatch: "full" },
  {
    path: "tasks",
    loadComponent: () =>
      import("./features/tasks/task-list.component").then(
        (m) => m.TaskListComponent,
      ),
    title: "Tasks · AstroDash",
  },
  {
    path: "projects",
    loadComponent: () =>
      import("./features/projects/project-list.component").then(
        (m) => m.ProjectListComponent,
      ),
    title: "Projects · AstroDash",
  },
  {
    path: "organizations",
    loadComponent: () =>
      import("./features/organizations/organization-list.component").then(
        (m) => m.OrganizationListComponent,
      ),
    title: "Organizations · AstroDash",
  },
  {
    path: "statistics",
    loadComponent: () =>
      import("./features/statistics/statistics-dashboard.component").then(
        (m) => m.StatisticsDashboardComponent,
      ),
    title: "Statistics · AstroDash",
  },
  {
    path: "users",
    loadComponent: () =>
      import("./features/users/user-list.component").then(
        (m) => m.UserListComponent,
      ),
    title: "Users · AstroDash",
  },
  {
    path: "users/workbench",
    title: "Users API Workbench · AstroDash",
    ...workbench(
      "Users API Workbench",
      "Test raw user endpoints directly with custom payloads.",
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
      "/users",
    ),
  },
  { path: "**", redirectTo: "" },
];
