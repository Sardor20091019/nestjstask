import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { OrganizationsRepo } from "./organizations.repo";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { db1 } from "../database/db";

@Injectable()
export class OrganizationsService {
  constructor(private readonly organizationsRepo: OrganizationsRepo) {}

  private async verifyAdmin(userId: number) {
    if (!userId || isNaN(userId)) {
      throw new NotFoundException("Missing user_id header");
    }
    const requester = await db1("users").where({ id: userId }).first();
    if (!requester) {
      throw new NotFoundException("Requester user not found");
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

  async findAll(body: { name?: string; page?: number; limit?: number }) {
    return this.organizationsRepo.findAll(body);
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
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    if (targetUser.role == 1 && 2) {
      throw new BadRequestException(
        "you are trying to asssing task to  either admin ro manager, therefore you only can assign tasks to users",
      );
    }
    return this.organizationsRepo.assignUser(orgId, userId);
  }

  async findbyitsname(name?: string) {
    return this.organizationsRepo.findbyitsname(name);
  }
}
