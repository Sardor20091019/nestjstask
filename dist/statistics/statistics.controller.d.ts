import { StatisticsService } from "./statistics.service";
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
    getOrganizations(): Promise<any[]>;
    getTasks(): Promise<any[]>;
    getOverallstatistics(): Promise<{
        total_organizations: number;
        total_projects: number;
        total_tasks: number;
    }>;
}
