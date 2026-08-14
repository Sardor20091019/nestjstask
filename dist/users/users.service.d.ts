import { UsersRepo } from "./users.repo";
import { Role } from "../enum/role.enum";
export declare class UsersService {
    private readonly usersRepo;
    constructor(usersRepo: UsersRepo);
    create(isadminornotID: number, body: {
        name: string;
        role: Role;
    }): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, body: {
        name?: string;
        role?: Role;
    }): Promise<any>;
    remove(id: number): Promise<boolean>;
}
