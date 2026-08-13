import { StatisticsService } from "./statistics.service";
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
    getOrganizations(): Promise<{
        organizations: any[];
        total_organizations: number;
    }>;
    getTasks(): Promise<{
        tasks: any[];
        total_tasks: number;
    }>;
    getOverallstatistics(): Promise<{
        total_organizations: number;
        total_projects: number;
        total_tasks: number;
    }>;
}
