import { Controller, Post, Body, Headers, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Role } from "../enum/role.enum";
import { findbynameDTO } from "./dto/find-by-name.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("create")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(
    @Headers() headers: any,
    @Body()
    body: {
      name: string;
      role: Role;
    },
  ) {
    return this.usersService.create(headers.user_id, body);
  }

  @Post("findall")
  findAll(@Body() body: { name?: string; page?: number; limit?: number }) {
    return this.usersService.findAll(body);
  }

  @Post("update")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(
    @Body()
    body: {
      id: number;
      name?: string;
      role?: Role;
    },
  ) {
    return this.usersService.update(body.id, body);
  }

  @Post("remove")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Body() body: { id: number }) {
    return this.usersService.remove(body.id);
  }

  @Post("findone")
  findOne(@Body() body: { id: number }) {
    return this.usersService.findOne(body.id);
  }
  @Post("findbyitsname")
  findbyitsname(@Body() body: findbynameDTO) {
    return this.usersService.findbyitsname(body.name);
  }
}
