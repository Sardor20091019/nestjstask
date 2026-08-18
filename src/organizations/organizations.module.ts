import { Module } from "@nestjs/common";
import { OrganizationsController } from "./organizations.controller";
import { OrganizationsService } from "./organizations.service";
import { OrganizationsRepo } from "./organizations.repo";

@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsService, OrganizationsRepo],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
