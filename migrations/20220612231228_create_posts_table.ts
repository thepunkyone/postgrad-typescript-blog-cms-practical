import { Knex } from "knex";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex: Knex) {
  return knex.schema.createTable("posts", (table) => {
    table.string("id");
    table.primary(["id"]);
    table.string("title").notNullable();
    table.string("author").notNullable();
    table.text("blurb").notNullable();
    table.timestamp("published").notNullable();
    table.text("content").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex: Knex) {
  return knex.schema.dropTable("posts");
};
