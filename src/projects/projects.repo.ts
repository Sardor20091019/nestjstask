import { Injectable } from "@nestjs/common";
import { db1 } from "../database/db";

@Injectable()
export class ProjectsRepo {
  async insert(data: { name: string; org_id: number; created_by: number }) {
    const [project] = await db1("projects").insert(data).returning("*");
    return project;
  }

  async findAll() {
    return db1("projects").select("*");
  }

  async findByOrg(orgId: number) {
    return db1("projects").where({ org_id: orgId }).select("*");
  }

  async findById(id: number) {
    return db1("projects").where({ id }).first();
  }

  async update(id: number, data: { name: string }) {
    const [updated] = await db1("projects")
      .where({ id })
      .update(data)
      .returning("*");
    return updated;
  }

  async remove(id: number) {
    await db1("projects").where({ id }).delete();
    return { deleted: true };
  }
}
