import { OrganizationsService } from "./organizations.service";
export declare class OrganizationsController {
    private readonly organizationsService;
    constructor(organizationsService: OrganizationsService);
    create(body: {
        name: string;
        created_by: number;
    }): Promise<any>;
    findAll(): Promise<any[]>;
    update(id: string, body: {
        name: string;
    }): Promise<any>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    assignUser(id: string, body: {
        userId: number;
    }): Promise<any>;
}
