import { type Knex } from "knex";

const config: Knex.Config = {
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST || "localhost",
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    database: process.env.POSTGRES_DB || "postgres",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    extension: "ts",
    directory: "./migrations",
    tableName: "migrations_history",
  },
  seeds: {
    extension: "ts",
    directory: "./seeds",
  },
};

export default config;
