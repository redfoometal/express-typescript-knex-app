import type { Knex } from "knex";

const tableName = "bookings";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments("id");

    table.integer("event_id").unsigned().notNullable();
    table.string("user_id").notNullable();

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());

    table
      .foreign("event_id")
      .references("id")
      .inTable("events")
      .onDelete("CASCADE");

    table.unique(["event_id", "user_id"], {
      indexName: `${tableName}_event_user_unique`,
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
