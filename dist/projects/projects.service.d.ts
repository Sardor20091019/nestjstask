import { ProjectsRepo } from "./projects.repo";
import { CreateProjectsDto } from "../dto/create-projects.dto";
import { UpdateProjectsDto } from "../dto/update-projects.dto";
export declare class ProjectsService {
    private readonly projectsRepo;
    constructor(projectsRepo: ProjectsRepo);
    create(data: CreateProjectsDto): Promise<any>;
    findAll(): Promise<any[]>;
    findByOrg(orgId: number): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, data: UpdateProjectsDto): Promise<any>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
