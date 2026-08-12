export declare class ProjectsRepo {
    insert(data: {
        name: string;
        org_id: number;
        created_by: number;
    }): Promise<any>;
    findAll(): Promise<any[]>;
    findByOrg(orgId: number): Promise<any[]>;
    findById(id: number): Promise<any>;
    update(id: number, data: {
        name: string;
    }): Promise<any>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
