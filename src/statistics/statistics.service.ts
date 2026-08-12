import { Injectable } from "@nestjs/common";
import { StatisticsRepo } from "./statistics.repo";
@Injectable()
export class StatisticsService {
  constructor(private readonly statisticsRepo: StatisticsRepo) {}

  async getOrganizations() {
    return await this.statisticsRepo.getOrganizations();
  }

  async getTasks() {
    return await this.statisticsRepo.getTasks();
  }

  async getOverallstatistics() {
    return await this.statisticsRepo.getOverallstatistics();
  }
}
