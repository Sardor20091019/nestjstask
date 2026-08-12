import knex from 'knex';
import 'dotenv/config';

export const db1 = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
  pool: {
    min: 2,
    max: 10,
  },
});
export const db2 = db1;
