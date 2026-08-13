import { Injectable } from "@nestjs/common";
import { db1 } from "../database/db";

@Injectable()
export class StatisticsRepo {
  async getOrganizationsStatistics() {
    const organizationss = await db1("organizations")
      .count("id as count")
      .first();
    const totalorganizations = Number(organizationss.count);
    const organizations = await db1("organizations").select("*");
    return {
      organizations: organizations,
      total_organizations: totalorganizations,
    };
  }
  async getTaskStatistics() {
    const tasks = await db1("tasks").count("id as count").first();
    const totaltasks = Number(tasks.count);
    const tasks1 = await db1("tasks").select("*");
    return {
      tasks: tasks1,
      total_tasks: totaltasks,
    };
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
