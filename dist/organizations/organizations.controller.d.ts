import { OrganizationsService } from "./organizations.service";
import { CreateOrganizationDto } from "../dto/create-organization.dto";
import { UpdateOrganizationDto } from "../dto/update-organization.dto";
export declare class OrganizationsController {
    private readonly organizationsService;
    constructor(organizationsService: OrganizationsService);
    create(body: CreateOrganizationDto): Promise<any>;
    findAll(): Promise<any[]>;
    update(id: string, body: UpdateOrganizationDto): Promise<any>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    assignUser(id: string, body: {
        userId: number;
    }): Promise<any>;
}
