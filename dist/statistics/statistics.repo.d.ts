export declare class StatisticsRepo {
    getOrganizationsStatistics(): Promise<any[]>;
    getTaskStatistics(): Promise<any[]>;
    getOverallstatistics(): Promise<{
        total_organizations: number;
        total_projects: number;
        total_tasks: number;
    }>;
}
