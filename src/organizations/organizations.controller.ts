import { Controller, Post, Body, Headers } from "@nestjs/common";
import { OrganizationsService } from "./organizations.service";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";

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
  findAll() {
    return this.organizationsService.findAll();
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
    return this.organizationsService.update(
      +userId,
      body.id,
      UpdateOrganizationDto,
    );
  }

  @Post("remove")
  remove(@Headers("user_id") userId: string, @Body() body: { id: number }) {
    return this.organizationsService.remove(+userId, body.id);
  }

  @Post("findone")
  findOne(@Body() id: number) {
    return this.organizationsService.findOne(id);
  }
}