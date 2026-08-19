import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { UsersRepo } from "./users.repo";
import { Role } from "../enum/role.enum";
import { db1 } from "../database/db";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepo) {}

async create(isadminornotID: number, body: { name: string; role: Role }) {
  const requester = await db1("users").where({ id: isadminornotID }).first();

  if (!requester) {
    throw new NotFoundException(
      "Requester user not found, write ur user ID in HEADER section KEY shoudl be user-id and value should be your userID ",
    );
  }

  if (requester.role !== 1) {
    throw new ForbiddenException("Only admins can create users");
  }

  const existingUser = await db1("users").where({ name: body.name }).first();

  if (existingUser) {
    throw new ConflictException("User with this name already exists, therefore itt can't be obtained by you, try other username");
  }

  return this.usersRepo.create(body);
}
  async findAll(body: { name?: string; page?: number; limit?: number }) {
    return this.usersRepo.findAll(body);
  }

  async findOne(id: number) {
    return this.usersRepo.findOne(id);
  }

  async update(id: number, body: { name?: string; role?: Role }) {
    return this.usersRepo.update(id, body);
  }
  async findbyitsname(name?: string) {
    return this.usersRepo.findbyitsname(name);
  }
  async remove(id: number) {
    return this.usersRepo.remove(id);
  }
}
