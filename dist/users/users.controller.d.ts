import { UsersService } from "./users.service";
import { Role } from "../enum/role.enum";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(headers: any, body: {
        name: string;
        role: Role;
    }): Promise<any>;
    findAll(): Promise<any[]>;
    update(id: number, body: {
        name?: string;
        role?: Role;
    }): Promise<any>;
    remove(id: number): Promise<boolean>;
    findOne(id: number): Promise<any>;
}
