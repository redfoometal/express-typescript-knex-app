import type { Knex } from "knex";

const tableName = "events";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments("id");
    table.string("name");
    table.integer("total_seats");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
