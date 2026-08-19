import { Injectable, inject } from "@angular/core";
import { ApiService } from "./api.service";

export interface OverallStatistics {
  total_organizations: number;
  total_projects: number;
  total_tasks: number;
}
export interface OrganizationStatistics {
  organization_name: string;
  projects_count: number;
  total_tasks: number;
}
export interface ProjectTaskStatistics {
  organization_name: string;
  project_name: string;
  project_tasks_count: number;
}

@Injectable({ providedIn: "root" })
export class StatisticsService {
  private readonly api = inject(ApiService);
  organizations() {
    return this.api.post<OrganizationStatistics[], Record<string, never>>(
      "/statistics/organizations",
      {},
    );
  }
  tasks() {
    return this.api.post<ProjectTaskStatistics[], Record<string, never>>(
      "/statistics/tasks",
      {},
    );
  }
  overall() {
    return this.api.post<OverallStatistics, Record<string, never>>(
      "/statistics/overallstatistics",
      {},
    );
  }
}
