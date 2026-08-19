import { Injectable, inject } from "@angular/core";
import { ApiService } from "./api.service";
import {
  CreateProject,
  PageRequest,
  PageResponse,
  Project,
  UpdateProject,
} from "./models";

@Injectable({ providedIn: "root" })
export class ProjectService {
  private readonly api = inject(ApiService);
  create(body: CreateProject) {
    return this.api.post<Project, CreateProject>("/projects/create", body);
  }
  findAll(name: string, page: PageRequest) {
    return this.api.post<PageResponse<Project>, { name: string } & PageRequest>(
      "/projects/findall",
      { name, ...page },
    );
  }
  findByName(name: string) {
    return this.api.post<Project[], { name: string }>(
      "/projects/findbyitsname",
      { name },
    );
  }
  findByOrganization(org_id: number) {
    return this.api.post<Project[], { org_id: number }>("/projects/findByOrg", {
      org_id,
    });
  }
  /** API accepts both /projects/update and the documented /projects/update/:id. */
  update(body: UpdateProject) {
    return this.api.post<Project, UpdateProject>(
      `/projects/update/${body.id}`,
      body,
    );
  }
  remove(id: number) {
    return this.api.post<{ deleted: boolean }, { id: number }>(
      "/projects/remove",
      { id },
    );
  }
}
