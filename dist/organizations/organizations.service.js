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
exports.OrganizationsService = void 0;
const common_1 = require("@nestjs/common");
const organizations_repo_1 = require("./organizations.repo");
let OrganizationsService = class OrganizationsService {
    constructor(organizationsRepo) {
        this.organizationsRepo = organizationsRepo;
    }
    async create(data) {
        return this.organizationsRepo.insert(data);
    }
    async findAll() {
        return this.organizationsRepo.findAll();
    }
    async findOne(id) {
        const org = await this.organizationsRepo.findById(id);
        if (!org) {
            throw new common_1.NotFoundException(`Organization with ID ${id} not found`);
        }
        return org;
    }
    async update(id, data) {
        await this.findOne(id);
        return this.organizationsRepo.update(id, data);
    }
    async remove(id) {
        await this.findOne(id);
        return this.organizationsRepo.remove(id);
    }
    async assignUser(orgId, userId) {
        await this.findOne(orgId);
        return this.organizationsRepo.assignUser(orgId, userId);
    }
};
exports.OrganizationsService = OrganizationsService;
exports.OrganizationsService = OrganizationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [organizations_repo_1.OrganizationsRepo])
], OrganizationsService);
//# sourceMappingURL=organizations.service.js.map