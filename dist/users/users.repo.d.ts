export declare class UsersRepo {
    create(data: {
        name: string;
        role: number;
        created_by?: number;
    }): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, data: {
        name?: string;
        role?: number;
        created_by?: number;
    }): Promise<any>;
    remove(id: number): Promise<number>;
}
