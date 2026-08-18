import { Injectable } from "@nestjs/common";
import { db1 } from "../database/db";
import { Role } from "../enum/role.enum";

@Injectable()
export class UsersRepo {
  async create(data: { name: string; role: Role; created_by?: number }) {
    const [user] = await db1("users").insert(data).returning("*");
    return user;
  }

  async findAll() {
    return await db1("users").select("*");
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
}
