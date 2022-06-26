"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.production = exports.test = exports.development = void 0;
require("dotenv/config");
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
exports.development = {
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
exports.test = {
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
exports.production = {
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
//# sourceMappingURL=knexfile.js.map