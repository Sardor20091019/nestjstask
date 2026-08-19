import { Injectable } from "@nestjs/common";
import { db1 } from "../database/db";
import { Role } from "../enum/role.enum";

@Injectable()
export class UsersRepo {
  async create(data: { name: string; role: Role; created_by?: number }) {
    const [user] = await db1("users").insert(data).returning("*");
    return user;
  }

  async findAll(body: { name?: string; page?: number; limit?: number }) {
    const page = body.page || 1;
    const limit = body.limit || 10;
    const offset = (page - 1) * limit;

    const query = db1("projects");

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

  async findOne(id: number) {
    return await db1("users").where({ id }).first();
  }

  async update(
    id: number,
    data: { name?: string; role?: Role; created_by?: number },
  ) {
    const [updatedUser] = await db1("users")
      .where({ id })
      .update(data)
      .returning("*");
    return updatedUser;
  }

  async remove(id: number) {
    await db1("users").where({ id }).delete();
    return true;
  }
  async findbyitsname(name?: string) {
    const findthem = db1("users");

    if (name) {
      findthem.whereILike("name", `%${name}%`);
    }

    return findthem;
  }
}
