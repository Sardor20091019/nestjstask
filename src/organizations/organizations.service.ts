/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { OrganizationsRepo } from './organizations.repo';

@Injectable()
export class OrganizationsService {
  constructor(private readonly organizationsRepo: OrganizationsRepo) {}

  async create(data: { name: string; created_by: number }) {
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

  async update(id: number, data: { name: string }) {
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
