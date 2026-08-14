import { StatisticsRepo } from "./statistics.repo";
export declare class StatisticsService {
    private readonly statisticsRepo;
    constructor(statisticsRepo: StatisticsRepo);
    getOrganizations(): Promise<any[]>;
    getTasks(): Promise<any[]>;
    getOverallstatistics(): Promise<{
        total_organizations: number;
        total_projects: number;
        total_tasks: number;
    }>;
}
