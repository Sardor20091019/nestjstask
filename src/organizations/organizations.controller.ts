import { Controller, Post, Body, Param } from "@nestjs/common";
import { OrganizationsService } from "./organizations.service";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";

@Controller("organizations")
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post("create")
  create(@Body() body: CreateOrganizationDto) {
    return this.organizationsService.create(body);
  }

  @Post("findall")
  findAll() {
    return this.organizationsService.findAll();
  }

  @Post("assign-user/:id")
  assignUser(@Param("id") id: string, @Body() body: { userId: number }) {
    return this.organizationsService.assignUser(+id, body.userId);
  }

  @Post("update/:id")
  update(@Param("id") id: string, @Body() body: UpdateOrganizationDto) {
    return this.organizationsService.update(+id, body);
  }

  @Post("remove/:id")
  remove(@Param("id") id: string) {
    return this.organizationsService.remove(+id);
  }

  @Post(":id")
  findOne(@Param("id") id: string) {
    return this.organizationsService.findOne(+id);
  }
}
