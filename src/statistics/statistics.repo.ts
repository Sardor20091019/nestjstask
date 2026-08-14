import { Injectable } from "@nestjs/common";
import { db1 } from "../database/db";

@Injectable()
export class StatisticsRepo {
  async getOrganizationsStatistics() {
    return db1("organizations as o")
      .leftJoin("projects as p", "p.org_id", "o.id")
      .leftJoin("tasks as t", "t.project_id", "p.id")
      .select(
        "o.name as organization_name",
        db1.raw("COUNT(DISTINCT p.id) as projects_count"),
        db1.raw("COUNT(t.id) as total_tasks"),
      )
      .groupBy("o.id", "o.name");
  }

  async getTaskStatistics() {
    return db1("projects as p")
      .join("organizations as o", "o.id", "p.org_id")
      .leftJoin("tasks as t", "t.project_id", "p.id")
      .select(
        "o.name as organization_name",
        "p.name as project_name",
        db1.raw("COUNT(t.id) as project_tasks_count"),
      )
      .groupBy("o.id", "o.name", "p.id", "p.name");
  }

  async getOverallstatistics() {
    const [organizationss, projectss, taskss] = await Promise.all([
      db1("organizations").count("id as count").first(),
      db1("projects").count("id as count").first(),
      db1("tasks").count("id as count").first(),
    ]);
    return {
      total_organizations: Number(organizationss.count),
      total_projects: Number(projectss.count),
      total_tasks: Number(taskss.count),
    };
  }
}
