import { Injectable, inject } from "@angular/core";
import { ApiService } from "./api.service";
import {
  CreateOrganization,
  Organization,
  PageRequest,
  PageResponse,
  UpdateOrganization,
  User,
} from "./models";

@Injectable({ providedIn: "root" })
export class OrganizationService {
  private readonly api = inject(ApiService);

  findAll(name: string, page: PageRequest) {
    return this.api.post<
      PageResponse<Organization>,
      { name: string } & PageRequest
    >("/organizations/findall", { name, ...page });
  }

  create(body: CreateOrganization) {
    return this.api.post<Organization, CreateOrganization>(
      "/organizations/create",
      body,
    );
  }
  findByName(name: string) {
    return this.api.post<Organization[], { name: string }>(
      "/organizations/findbyitsname",
      { name },
    );
  }
  findOne(id: number) {
    return this.api.post<Organization, { id: number }>(
      "/organizations/findone",
      { id },
    );
  }
  update(body: UpdateOrganization) {
    return this.api.post<Organization, UpdateOrganization>(
      "/organizations/update",
      body,
    );
  }
  assignUser(id: number, userId: number) {
    return this.api.post<Organization | User, { id: number; userId: number }>(
      "/organizations/assign-user",
      { id, userId },
    );
  }
  remove(id: number) {
    return this.api.post<{ deleted: boolean }, { id: number }>(
      "/organizations/remove",
      { id },
    );
  }
}
