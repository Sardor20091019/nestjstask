import { Controller, Post, Body, Headers } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Role } from "../enum/role.enum";
import { findbynameDTO } from "./dto/find-by-name.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("create")
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
