export declare class StatisticsRepo {
    getOrganizationsStatistics(): Promise<{
        organizations: any[];
        total_organizations: number;
    }>;
    getTaskStatistics(): Promise<{
        tasks: any[];
        total_tasks: number;
    }>;
    getOverallstatistics(): Promise<{
        total_organizations: number;
        total_projects: number;
        total_tasks: number;
    }>;
}
