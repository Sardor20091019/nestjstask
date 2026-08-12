import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(body: {
        name: string;
        role: number;
        created_by?: number;
    }): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, body: {
        name?: string;
        role?: number;
        created_by?: number;
    }): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
