import { Controller, Post, Body, Param, Query, Headers } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { CreateProjectsDto } from "./dto/create-projects.dto";
import { UpdateProjectsDto } from "./dto/update-projects.dto";

@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post("create")
  create(@Headers() headers: any, @Body() body: CreateProjectsDto) {
    return this.projectsService.create(headers.user_id, body);
  }

  @Post("findAll")
  findAll() {
    return this.projectsService.findAll();
  }

  @Post("findByOrg")
  findByOrg(@Query("org_id") orgId?: string) {
    return this.projectsService.findByOrg(+orgId);
  }

  @Post("update/:id")
  update(
    @Headers() headers: any,
    @Param("id") id: string,
    @Body() body: UpdateProjectsDto,
  ) {
    return this.projectsService.update(headers.user_id, +id, body);
  }

  @Post("remove/:id")
  remove(@Headers() headers: any, @Param("id") id: string) {
    return this.projectsService.remove(headers.user_id, +id);
  }
}