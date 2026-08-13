import { OrganizationsRepo } from "./organizations.repo";
import { CreateOrganizationDto } from "../dto/create-organization.dto";
import { UpdateOrganizationDto } from "../dto/update-organization.dto";
export declare class OrganizationsService {
    private readonly organizationsRepo;
    constructor(organizationsRepo: OrganizationsRepo);
    create(data: CreateOrganizationDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, data: UpdateOrganizationDto): Promise<any>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
    assignUser(orgId: number, userId: number): Promise<any>;
}
