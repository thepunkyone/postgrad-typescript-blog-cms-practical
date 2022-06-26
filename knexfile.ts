import "dotenv/config";
import { Knex } from "knex";

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const development: Knex.Config = {
  client: "postgresql",
  connection: `${process.env.DATABASE_URL}/blog_dev`,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: __dirname + "/migrations",
  },
};

export const test: Knex.Config = {
  client: "postgresql",
  connection: `${process.env.DATABASE_URL}/blog_test`,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: __dirname + "/migrations",
  },
};

export const production: Knex.Config = {
  client: "postgresql",
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: __dirname + "/migrations",
  },
};
