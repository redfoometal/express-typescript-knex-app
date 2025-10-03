import { Knex } from "knex";
import { EventsTable } from "../types/events.types";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("events").del();

  // Inserts seed entries
  await knex<EventsTable>("events").insert([
    { id: 1, name: "Jazz festival", total_seats: 100 },
    { id: 2, name: "Rock festival", total_seats: 5 },
    { id: 3, name: "Rap festival", total_seats: 3 },
    { id: 4, name: "Country festival", total_seats: 10 },
    { id: 5, name: "Classic music festival", total_seats: 11 },
  ]);
}
