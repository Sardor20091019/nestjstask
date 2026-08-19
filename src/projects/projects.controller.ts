import { Controller, Post, Body, Headers } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { CreateProjectsDto } from "./dto/create-projects.dto";
import { UpdateProjectsDto } from "./dto/update-projects.dto";
import { findbynameDTO } from "./dto/find-by-name.dto";

@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post("create")
  create(@Headers("user_id") userId: string, @Body() body: CreateProjectsDto) {
    return this.projectsService.create(+userId, body);
  }

  @Post("findall")
  findAll(@Body() body: { name?: string; page?: number; limit?: number }) {
    return this.projectsService.findAll(body);
  }

  @Post("findByOrg")
  findByOrg(@Body("org_id") orgId?: string) {
    return this.projectsService.findByOrg(orgId ? +orgId : 0);
  }

  @Post("update")
  update(
    @Headers("user_id") userId: string,
    @Body() body: { id: number } & UpdateProjectsDto,
  ) {
    const { id, ...updateData } = body;
    return this.projectsService.update(+userId, id, updateData);
  }

  @Post("remove")
  remove(@Headers("user_id") userId: string, @Body() body: { id: number }) {
    return this.projectsService.remove(+userId, body.id);
  }
  @Post("findbyitsname")
  findbyitsname(@Body() body: findbynameDTO) {
    return this.projectsService.findbyitsname(body.name);
  }
}
