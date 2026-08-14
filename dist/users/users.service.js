"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repo_1 = require("./users.repo");
const db_1 = require("../database/db");
let UsersService = class UsersService {
    constructor(usersRepo) {
        this.usersRepo = usersRepo;
    }
    async create(isadminornotID, body) {
        const requester = await (0, db_1.db1)("users").where({ id: isadminornotID }).first();
        if (!requester) {
            throw new common_1.NotFoundException("Requester user not found, write ur user ID in HEADER section KEY shoudl be user-id and value should be your userID ");
        }
        if (requester.role !== 1) {
            throw new common_1.ForbiddenException("Only admins can create users");
        }
        return this.usersRepo.create(body);
    }
    async findAll() {
        return this.usersRepo.findAll();
    }
    async findOne(id) {
        return this.usersRepo.findOne(id);
    }
    async update(id, body) {
        return this.usersRepo.update(id, body);
    }
    async remove(id) {
        return this.usersRepo.remove(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repo_1.UsersRepo])
], UsersService);
//# sourceMappingURL=users.service.js.map