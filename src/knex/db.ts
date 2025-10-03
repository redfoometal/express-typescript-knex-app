import knex from "knex";
import knexConfig from "../knex/knexfile";

export const db = knex(knexConfig);
