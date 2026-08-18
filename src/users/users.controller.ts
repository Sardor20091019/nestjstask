import { Controller, Post, Body, Headers } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Role } from "../enum/role.enum";

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
  findAll() {
    return this.usersService.findAll();
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
}
.