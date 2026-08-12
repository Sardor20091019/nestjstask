import { Controller, Post, Body, Param, ParseIntPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Role } from "../enum/role.enum";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("create")
  create(
    @Body()
    body: {
      name: string;
      role: Role;
      created_by?: number;
    },
  ) {
    return this.usersService.create(body);
  }

  @Post("findall")
  findAll() {
    return this.usersService.findAll();
  }

  @Post("update/:id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body()
    body: {
      name?: string;
      role?: Role;
      created_by?: number;
    },
  ) {
    return this.usersService.update(id, body);
  }

  @Post("remove/:id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Post(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
}
