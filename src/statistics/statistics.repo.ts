import { Injectable } from "@nestjs/common";
import { db1 } from "../database/db";

@Injectable()
export class StatisticsRepo {
    async getOrganizations() {
        return await db1("organizations as o ")
        .select("*")
        .leftJoin
    }
    async getTasks() {
        return await db1("projects as p")
        .select("*")
        .leftJoin
    }
    async getOverallstatistics() {
        return await db1("statistics")
        .select("*")
    }
}
