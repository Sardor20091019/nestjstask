import {
  Controller,
  Post,
  Body,
  Headers,
  Param,
  UseGuards,
} from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { CreateProjectsDto } from "./dto/create-projects.dto";
import { UpdateProjectsDto } from "./dto/update-projects.dto";
import { findbynameDTO } from "./dto/find-by-name.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../enum/role.enum";

@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post("create")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  create(@Headers("user_id") userId: string, @Body() body: CreateProjectsDto) {
    return this.projectsService.create(+userId, body);
  }

  @Post("findall")
  findAll(@Body() body: { name?: string; page?: number; limit?: number }) {
    return this.projectsService.findAll(body);
  }

  @Post("findone")
  findOne(@Body() body: { id: number }) {
    return this.projectsService.findOne(body.id);
  }

  @Post("findByOrg")
  findByOrg(@Body("org_id") orgId?: string) {
    return this.projectsService.findByOrg(orgId ? +orgId : 0);
  }

  @Post(["update", "update/:id"])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  update(
    @Headers("user_id") userId: string,
    @Body() body: { id: number } & UpdateProjectsDto,
    @Param("id") idFromPath?: string,
  ) {
    const { id, ...updateData } = body;
    return this.projectsService.update(+userId, id ?? +idFromPath!, updateData);
  }

  @Post("remove")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  remove(@Headers("user_id") userId: string, @Body() body: { id: number }) {
    return this.projectsService.remove(+userId, body.id);
  }

  @Post("findbyitsname")
  findbyitsname(@Body() body: findbynameDTO) {
    return this.projectsService.findbyitsname(body.name);
  }
}