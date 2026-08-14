import { Controller, Post, Body, Param, Headers } from "@nestjs/common";
import { OrganizationsService } from "./organizations.service";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";

@Controller("organizations")
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post("create")
  create(@Headers() headers: any, @Body() body: CreateOrganizationDto) {
    return this.organizationsService.create(headers.user_id, body);
  }

  @Post("findall")
  findAll() {
    return this.organizationsService.findAll();
  }

  @Post("assign-user/:id")
  assignUser(
    @Headers() headers: any,
    @Param("id") id: string,
    @Body() body: { userId: number },
  ) {
    return this.organizationsService.assignUser(headers.user_id, +id, body.userId);
  }

  @Post("update/:id")
  update(
    @Headers() headers: any,
    @Param("id") id: string,
    @Body() body: UpdateOrganizationDto,
  ) {
    return this.organizationsService.update(headers.user_id, +id, body);
  }

  @Post("remove/:id")
  remove(@Headers() headers: any, @Param("id") id: string) {
    return this.organizationsService.remove(headers.user_id, +id);
  }

  @Post(":id")
  findOne(@Param("id") id: string) {
    return this.organizationsService.findOne(+id);
  }
}