import { Injectable } from "@nestjs/common";
import { db1 } from "../database/db";
import { CreateProjectsDto } from "./dto/create-projects.dto";
import { UpdateProjectsDto } from "./dto/update-projects.dto";

@Injectable()
export class ProjectsRepo {
  async insert(data: CreateProjectsDto) {
    const [project] = await db1("projects").insert(data).returning("*");
    return project;
  }

  async findAll(body: { name?: string; page?: number; limit?: number }) {
    const page = body.page || 1;
    const limit = body.limit || 10;
    const offset = (page - 1) * limit;

    const query = db1("organizations");

    if (body.name) {
      query.whereILike("name", `%${body.name}%`);
    }

    const data = await query.clone().limit(limit).offset(offset);
    const countResult = await query.clone().count("id as count").first();
    const total = countResult ? Number(countResult.count) : 0;

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByOrg(orgId: number) {
    return db1("projects").where({ org_id: orgId }).select("*");
  }

  async findById(id: number) {
    return db1("projects").where({ id }).first();
  }

  async update(id: number, data: UpdateProjectsDto) {
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
  async findbyitsname(name?: string) {
    const findthem = db1("projects");

    if (name) {
      findthem.whereILike("name", `%${name}%`);
    }

    return findthem;
  }
}
