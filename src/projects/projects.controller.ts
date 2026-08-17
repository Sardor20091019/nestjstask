import {
  Controller,
  Post,
  Body,
  Param,
  Query,
  Headers,
  ParseIntPipe,
} from "@nestjs/common";
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
  findByOrg(@Query("org_id") orgId?: string) {
    return this.projectsService.findByOrg(orgId ? +orgId : 0);
  }

  @Post("update/:id")
  update(
    @Headers("user_id") userId: string,
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateProjectsDto,
  ) {
    return this.projectsService.update(+userId, id, body);
  }

  @Post("remove/:id")
  remove(
    @Headers("user_id") userId: string,
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.projectsService.remove(+userId, id);
  }
}
