import { StatisticsService } from "./statistics.service";
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
    getOrganizations(): Promise<import("knex").Knex.Join<any, {
        _base: any;
        _hasSelection: false;
        _keys: string;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    }[]>>;
    getTasks(): Promise<import("knex").Knex.Join<any, {
        _base: any;
        _hasSelection: false;
        _keys: string;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    }[]>>;
    getOverallstatistics(): Promise<any[]>;
}
