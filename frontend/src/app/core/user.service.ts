import { Injectable, inject } from "@angular/core";
import { ApiService } from "./api.service";
import {
  CreateUser,
  PageRequest,
  PageResponse,
  UpdateUser,
  User,
} from "./models";

@Injectable({ providedIn: "root" })
export class UserService {
  private readonly api = inject(ApiService);
  create(body: CreateUser) {
    return this.api.post<User, CreateUser>("/users/create", body);
  }
  findAll(name = "", page: PageRequest = { page: 1, limit: 10 }) {
    return this.api.post<PageResponse<User>, { name: string } & PageRequest>(
      "/users/findall",
      { name, ...page },
    );
  }
  findByName(name: string) {
    return this.api.post<User[], { name: string }>("/users/findbyitsname", {
      name,
    });
  }
  findOne(id: number) {
    return this.api.post<User, { id: number }>("/users/findone", { id });
  }
  update(body: UpdateUser) {
    return this.api.post<User, UpdateUser>("/users/update", body);
  }
  remove(id: number) {
    return this.api.post<{ deleted: boolean }, { id: number }>(
      "/users/remove",
      { id },
    );
  }
}
