import { Injectable } from "@nestjs/common";
import { db1 } from "../database/db";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";

@Injectable()
export class OrganizationsRepo {
  async insert(data: CreateOrganizationDto) {
    const [org] = await db1("organizations").insert(data).returning("*");
    return org;
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
      paginationinfo: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: number) {
    return db1("organizations").where({ id }).first();
  }

  async update(id: number, data: UpdateOrganizationDto) {
    const [updated] = await db1("organizations")
      .where({ id })
      .update(data)
      .returning("*");
    return updated;
  }

  async remove(id: number) {
    await db1("organizations").where({ id }).delete();
    return { deleted: true };
  }

  async assignUser(orgId: number, userId: number) {
    const [assign] = await db1("organization_user")
      .insert({ org_id: orgId, user_id: userId })
      .returning("*");
    return assign;
  }

  async findbyitsname(name?: string) {
    const findthem = db1("organizations");

    if (name) {
      findthem.whereILike("name", `%${name}%`);
    }

    return findthem;
  }
}
