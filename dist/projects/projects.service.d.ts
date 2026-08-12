import { ProjectsRepo } from "./projects.repo";
export declare class ProjectsService {
    private readonly projectsRepo;
    constructor(projectsRepo: ProjectsRepo);
    create(data: {
        name: string;
        org_id: number;
        created_by: number;
    }): Promise<any>;
    findAll(): Promise<any[]>;
    findByOrg(orgId: number): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, data: {
        name: string;
    }): Promise<any>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
