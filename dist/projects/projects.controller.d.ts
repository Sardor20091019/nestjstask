import { ProjectsService } from "./projects.service";
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(body: {
        name: string;
        org_id: number;
        created_by: number;
    }): Promise<any>;
    findByOrg(orgId?: string): Promise<any[]>;
    update(id: string, body: {
        name: string;
    }): Promise<any>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
