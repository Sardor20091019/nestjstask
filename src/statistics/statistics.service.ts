import { Injectable } from "@nestjs/common";
import { StatisticsRepo } from "./statistics.repo";
@Injectable()
export class StatisticsService {
  constructor(private readonly statisticsRepo: StatisticsRepo) {}

  async getOrganizations() {
    return await this.statisticsRepo.getOrganizationsStatistics();
  }

  async getTasks() {
    return await this.statisticsRepo.getTaskStatistics();
  }

  async getOverallstatistics() {
    return await this.statisticsRepo.getOverallstatistics();
  }
}
