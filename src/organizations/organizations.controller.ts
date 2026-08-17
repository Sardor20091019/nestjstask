import {
  Controller,
  Post,
  Body,
  Param,
  Headers,
  ParseIntPipe,
} from "@nestjs/common";
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

  @Post("assign-user/:id")
  assignUser(
    @Headers("user_id") userId: string,
    @Param("id", ParseIntPipe) id: number,
    @Body() body: { userId: number },
  ) {
    return this.organizationsService.assignUser(+userId, id, body.userId);
  }

  @Post("update/:id")
  update(
    @Headers("user_id") userId: string,
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateOrganizationDto,
  ) {
    return this.organizationsService.update(+userId, id, body);
  }

  @Post("remove/:id")
  remove(
    @Headers("user_id") userId: string,
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.organizationsService.remove(+userId, id);
  }

  @Post(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.organizationsService.findOne(id);
  }
}
