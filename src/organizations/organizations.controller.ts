import { Controller, Post, Body, Headers } from "@nestjs/common";
import { OrganizationsService } from "./organizations.service";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { findbynameDTO } from "./dto/find-by-name.dto";
//
@Controller("organizations")
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post("create")
  create(
    @Headers("user_id") userId: string,
    @Body() body: CreateOrganizationDto,
  ) {
    return this.organizationsService.create(+userId, body);
  }

  @Post("findall")
  findAll(@Body() body: { name?: string; page?: number; limit?: number }) {
    return this.organizationsService.findAll(body);
  }

  @Post("assign-user")
  assignUser(
    @Headers("user_id") userId: string,
    @Body() body: { id: number; userId: number },
  ) {
    return this.organizationsService.assignUser(+userId, body.id, body.userId);
  }

  @Post("update")
  update(
    @Headers("user_id") userId: string,
    @Body() body: { id: number } & UpdateOrganizationDto,
  ) {
    const { id, ...updateData } = body;
    return this.organizationsService.update(+userId, id, updateData);
  }
  @Post("findone")
  findOne(@Body() body: { id: number }) {
    return this.organizationsService.findOne(body.id);
  }
  @Post("remove")
  remove(@Headers("user_id") userId: string, @Body() body: { id: number }) {
    return this.organizationsService.remove(+userId, body.id);
  }
  @Post("findbyitsname")
  findbyitsname(@Body() body: findbynameDTO) {
    return this.organizationsService.findbyitsname(body.name);
  }
}
