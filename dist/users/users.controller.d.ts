import { UsersService } from "./users.service";
import { Role } from "../enum/role.enum";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(body: {
        name: string;
        role: Role;
        created_by?: number;
    }): Promise<any>;
    findAll(): Promise<any[]>;
    update(id: number, body: {
        name?: string;
        role?: Role;
        created_by?: number;
    }): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
    findOne(id: number): Promise<any>;
}
