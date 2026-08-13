import { CreateOrganizationDto } from "../dto/create-organization.dto";
import { UpdateOrganizationDto } from "../dto/update-organization.dto";
export declare class OrganizationsRepo {
    insert(data: CreateOrganizationDto): Promise<any>;
    findAll(): Promise<any[]>;
    findById(id: number): Promise<any>;
    update(id: number, data: UpdateOrganizationDto): Promise<any>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
    assignUser(orgId: number, userId: number): Promise<any>;
}
