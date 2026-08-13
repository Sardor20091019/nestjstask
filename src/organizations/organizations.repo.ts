import { Injectable } from "@nestjs/common";
import { db1 } from "../database/db";
import { CreateOrganizationDto } from "../dto/create-organization.dto";
import { UpdateOrganizationDto } from "../dto/update-organization.dto";

@Injectable()
export class OrganizationsRepo {
  async insert(data: CreateOrganizationDto) {
    const [org] = await db1("organizations").insert(data).returning("*");
    return org;
  }

  async findAll() {
    return db1("organizations").select("*");
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
    const [relation] = await db1("organization_user")
      .insert({ org_id: orgId, user_id: userId })
      .returning("*");
    return relation;
  }
}
