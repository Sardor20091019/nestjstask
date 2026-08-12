import { Controller, Post } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";

@Controller("statistics")
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Post("organizations")
  getOrganizations() {
    return this.statisticsService.getOrganizations();
  }
  @Post("tasks")
  getTasks() {
    return this.statisticsService.getTasks();
  }
  @Post("overallstatistics")
  getOverallstatistics() {
    return this.statisticsService.getOverallstatistics();
  }
}
