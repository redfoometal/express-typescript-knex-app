import type { Knex } from "knex";

const ON_UPDATE_MODIFIEND_COLUMNS = `
  CREATE OR REPLACE FUNCTION update_modified_column()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = now();
    RETURN NEW;
  END;
$$ language 'plpgsql';
`;

const DROP_ON_UPDATE_MODIFIEND_COLUMNS = "DROP FUNCTION update_modified_column";

export async function up(knex: Knex): Promise<void> {
  return knex.raw(ON_UPDATE_MODIFIEND_COLUMNS);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(DROP_ON_UPDATE_MODIFIEND_COLUMNS);
}
