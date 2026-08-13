import { Injectable, NotFoundException } from "@nestjs/common";
import { ProjectsRepo } from "./projects.repo";
import { CreateProjectsDto } from "../dto/create-projects.dto";
import { UpdateProjectsDto } from "../dto/update-projects.dto";

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepo: ProjectsRepo) {}

  async create(data: CreateProjectsDto) {
    return this.projectsRepo.insert(data);
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

  async update(id: number, data: UpdateProjectsDto) {
    await this.findOne(id);
    return this.projectsRepo.update(id, data);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.projectsRepo.remove(id);
  }
}
