import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { OrganizationsRepo } from "./organizations.repo";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { db1 } from "../database/db";

@Injectable()
export class OrganizationsService {
  constructor(private readonly organizationsRepo: OrganizationsRepo) {}


   async verifyAdmin(userId: number) {
    const requester = await db1("users").where({ id: userId }).first();

    if (!requester) {
      throw new NotFoundException(
        "Requester user not found, pass your user ID in the header as user_id",
      );
    }

    if (requester.role !== 1) {
      throw new ForbiddenException("Only admins can perform this action");
    }

    return requester;
  }

  async create(adminId: number, data: CreateOrganizationDto) {
    await this.verifyAdmin(adminId);
    return this.organizationsRepo.insert(data);
  }

  async findAll() {
    return this.organizationsRepo.findAll();
  }

  async findOne(id: number) {
    const org = await this.organizationsRepo.findById(id);
    if (!org) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return org;
  }

  async update(adminId: number, id: number, data: UpdateOrganizationDto) {
    await this.verifyAdmin(adminId);
    await this.findOne(id);
    return this.organizationsRepo.update(id, data);
  }

  async remove(adminId: number, id: number) {
    await this.verifyAdmin(adminId);
    await this.findOne(id);
    return this.organizationsRepo.remove(id);
  }

  async assignUser(adminId: number, orgId: number, userId: number) {
    await this.verifyAdmin(adminId);
    await this.findOne(orgId);


    const targetUser = await db1("users").where({ id: userId }).first();
    if (!targetUser) {
      throw new NotFoundException(`User with ID ${userId} not found to assign`);
    }

    return this.organizationsRepo.assignUser(orgId, userId);
  }
}