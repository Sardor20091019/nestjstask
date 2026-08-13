export declare class StatisticsRepo {
    getOrganizationsStatistics(): Promise<{
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
    getTaskStatistics(): Promise<{
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
