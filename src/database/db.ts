import knex from "knex";
import "dotenv/config";
import { env } from "process";

export const db1 = knex({
  client: "pg",
  connection: {
    connectionString: env.DATABASE_URL,
  },
  pool: {
    min: 2,
    max: 10,
  },
});
export const db2 = db1;
