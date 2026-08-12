import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body()
    body: {
      name: string;
      role: number;
      created_by?: number;
    },
  ) {
    return this.usersService.create(body);
  }

  @Post()
  findAll() {
    return this.usersService.findAll();
  }

  @Post(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      name?: string;
      role?: number;
      created_by?: number;
    },
  ) {
    return this.usersService.update(id, body);
  }

  @Post('remove/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}