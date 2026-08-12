import { Controller, Post, Body, Param } from "@nestjs/common";
import { OrganizationsService } from "./organizations.service";

@Controller("organizations")
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post("create")
  create(@Body() body: { name: string; created_by: number }) {
    return this.organizationsService.create(body);
  }

  @Post()
  findAll() {
    return this.organizationsService.findAll();
  }

  @Post(":id")
  update(@Param("id") id: string, @Body() body: { name: string }) {
    return this.organizationsService.update(+id, body);
  }

  @Post("remove/:id")
  remove(@Param("id") id: string) {
    return this.organizationsService.remove(+id);
  }

  @Post(":id/assign-user")
  assignUser(@Param("id") id: string, @Body() body: { userId: number }) {
    return this.organizationsService.assignUser(+id, body.userId);
  }
}
