import { Injectable } from "@nestjs/common";
import { db1 } from "../database/db";

@Injectable()
export class StatisticsRepo {
  async getOrganizationsStatistics() {
    const organizationss = await new Promise(
      db1("organizations").count("id as count").first(),
    );
    return {
      organizations: db1("organizations").select("*"),
      total_organizations: Number(organizationss.count),
    };
  }
  async getTaskStatistics() {
    const tasks = await new Promise(
      db1("tasks").count("id as count").first(),
    );
    return {
      tasks: db1("tasks").select("*"),
      total_tasks: Number(tasks.count),
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
