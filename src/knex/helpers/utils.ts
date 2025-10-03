import { type Knex } from "knex";

export const createOnUpdateTrigger = (tableName: string) => `
  CREATE TRIGGER "${tableName}_updated_at"
  BEFORE UPDATE ON "${tableName}"
  FOR EACH ROW
  EXECUTE PROCEDURE update_modified_column();`;

export const deleteOnUpdateTrigger = (tableName: string) => `
  DROP TRIGGER "${tableName}_updated_at" ON "${tableName}";
`;

export const defaultHistoryFields = (
  knex: Knex,
  table: Knex.CreateTableBuilder
): void => {
  table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
  table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
};
