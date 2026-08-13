import { Controller, Post, Body, Param, Query } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { CreateProjectsDto } from "../dto/create-projects.dto";
import { UpdateProjectsDto } from "../dto/update-projects.dto";

@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post("create")
  create(@Body() body: CreateProjectsDto) {
    return this.projectsService.create(body);
  }

  @Post("update")
  findByOrg(@Query("org_id") orgId?: string) {
    return orgId
      ? this.projectsService.findByOrg(+orgId)
      : this.projectsService.findAll();
  }

  @Post(":id")
  update(@Param("id") id: string, @Body() body: UpdateProjectsDto) {
    return this.projectsService.update(+id, body);
  }

  @Post("remove/:id")
  remove(@Param("id") id: string) {
    return this.projectsService.remove(+id);
  }
}
