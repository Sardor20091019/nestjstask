import { Controller, Post, Body, Headers } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { CreateProjectsDto } from "./dto/create-projects.dto";
import { UpdateProjectsDto } from "./dto/update-projects.dto";

@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post("create")
  create(@Headers("user_id") userId: string, @Body() body: CreateProjectsDto) {
    return this.projectsService.create(+userId, body);
  }

  @Post("findAll")
  findAll() {
    return this.projectsService.findAll();
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
}
