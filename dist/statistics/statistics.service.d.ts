import { StatisticsRepo } from "./statistics.repo";
export declare class StatisticsService {
    private readonly statisticsRepo;
    constructor(statisticsRepo: StatisticsRepo);
    getOrganizations(): Promise<{
        organizations: import("knex").Knex.QueryBuilder<any, {
            _base: any;
            _hasSelection: false;
            _keys: string;
            _aliases: {};
            _single: false;
            _intersectProps: {};
            _unionProps: never;
        }[]>;
        total_organizations: number;
    }>;
    getTasks(): Promise<{
        tasks: import("knex").Knex.QueryBuilder<any, {
            _base: any;
            _hasSelection: false;
            _keys: string;
            _aliases: {};
            _single: false;
            _intersectProps: {};
            _unionProps: never;
        }[]>;
        total_tasks: number;
    }>;
    getOverallstatistics(): Promise<{
        total_organizations: number;
        total_projects: number;
        total_tasks: number;
    }>;
}
