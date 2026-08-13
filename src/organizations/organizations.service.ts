import { Injectable, NotFoundException } from "@nestjs/common";
import { OrganizationsRepo } from "./organizations.repo";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";

@Injectable()
export class OrganizationsService {
  constructor(private readonly organizationsRepo: OrganizationsRepo) {}

  async create(data: CreateOrganizationDto) {
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

  async update(id: number, data: UpdateOrganizationDto) {
    await this.findOne(id);
    return this.organizationsRepo.update(id, data);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.organizationsRepo.remove(id);
  }

  async assignUser(orgId: number, userId: number) {
    await this.findOne(orgId);
    return this.organizationsRepo.assignUser(orgId, userId);
  }
}
