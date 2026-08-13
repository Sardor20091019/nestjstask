import { ProjectsService } from "./projects.service";
import { CreateProjectsDto } from "./dto/create-projects.dto";
import { UpdateProjectsDto } from "./dto/update-projects.dto";
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(body: CreateProjectsDto): Promise<any>;
    findAll(): Promise<any[]>;
    findByOrg(orgId?: string): Promise<any[]>;
    update(id: string, body: UpdateProjectsDto): Promise<any>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
