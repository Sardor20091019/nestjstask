import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Headers,
} from "@nestjs/common";
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

  @Post("update/:id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body()
    body: {
      name?: string;
      role?: Role;
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
