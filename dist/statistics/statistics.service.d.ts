import { StatisticsRepo } from "./statistics.repo";
export declare class StatisticsService {
    private readonly statisticsRepo;
    constructor(statisticsRepo: StatisticsRepo);
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
