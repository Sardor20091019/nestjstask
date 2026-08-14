import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ProjectsRepo } from "./projects.repo";
import { CreateProjectsDto } from "./dto/create-projects.dto";
import { UpdateProjectsDto } from "./dto/update-projects.dto";
import { db1 } from "../database/db";

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepo: ProjectsRepo) {}

  private async verifyManagerOrAdmin(userId: number) {
    if (!userId || isNaN(userId)) {
      throw new NotFoundException("Missing user_id header");
    }
    const requester = await db1("users").where({ id: userId }).first();
    if (!requester) {
      throw new NotFoundException("Requester user not found");
    }
    if (requester.role !== 1 && requester.role !== 2) {
      throw new ForbiddenException("Only Admins and Managers can manage projects");
    }
    return requester;
  }

  async create(userId: number, data: CreateProjectsDto) {
    await this.verifyManagerOrAdmin(userId);
    return this.projectsRepo.insert({ ...data, created_by: userId });
  }

  async findAll() {
    return this.projectsRepo.findAll();
  }

  async findByOrg(orgId: number) {
    return this.projectsRepo.findByOrg(orgId);
  }

  async findOne(id: number) {
    const project = await this.projectsRepo.findById(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(userId: number, id: number, data: UpdateProjectsDto) {
    await this.verifyManagerOrAdmin(userId);
    await this.findOne(id);
    return this.projectsRepo.update(id, data);
  }

  async remove(userId: number, id: number) {
    await this.verifyManagerOrAdmin(userId);
    await this.findOne(id);
    return this.projectsRepo.remove(id);
  }
}