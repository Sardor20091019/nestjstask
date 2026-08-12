import { OrganizationsRepo } from "./organizations.repo";
export declare class OrganizationsService {
    private readonly organizationsRepo;
    constructor(organizationsRepo: OrganizationsRepo);
    create(data: {
        name: string;
        created_by: number;
    }): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, data: {
        name: string;
    }): Promise<any>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
    assignUser(orgId: number, userId: number): Promise<any>;
}
