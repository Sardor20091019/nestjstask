import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepo } from './users.repo';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepo) {}

  async create(data: { name: string; role: number; created_by?: number }) {
    return await this.usersRepo.create(data);
  }

  async findAll() {
    return await this.usersRepo.findAll();
  }

  async findOne(id: number) {
    const user = await this.usersRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(
    id: number,
    data: { name?: string; role?: number; created_by?: number },
  ) {
    await this.findOne(id); 
    return await this.usersRepo.update(id, data);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.usersRepo.remove(id);
    return { message: `User with ID ${id} successfully deleted` };
  }
}