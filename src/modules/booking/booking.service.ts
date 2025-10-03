import { Knex } from "knex";
import { EventsTable } from "../../knex/types/events.types";
import { Tables } from "../../knex/types/tables.types";
import {
  BadRequestException,
  InternalServerErrorException,
} from "../../core/exceptions";
import { BookingsTable } from "../../knex/types/bookings.types";

interface ReserveSeatsRequest {
  event_id: number;
  user_id: string;
}

interface BookingResult {
  bookingId: number;
  eventId: number;
  userId: string;
  createdAt: Date;
  status: string;
}

export class BookingService {
  constructor(private readonly db: Knex) {}

  async reserveSeats(data: ReserveSeatsRequest): Promise<BookingResult> {
    const { event_id, user_id } = data;

    return await this.db.transaction(async (trx) => {
      // Check exist event
      const event = await trx<EventsTable>(Tables.Events)
        .where({ id: event_id })
        .forUpdate()
        .first();

      if (!event) {
        throw new BadRequestException("Event not found");
      }

      // Check available seats
      const bookedSeats = await trx<BookingsTable>(Tables.Bookings)
        .where({ event_id })
        .count({ count: "id" })
        .first();

      const bookedCount = parseInt((bookedSeats?.count as string) || "0");

      if (bookedCount >= event.total_seats) {
        throw new BadRequestException("No available seats for this event");
      }

      // Check user reserve
      const existingBooking = await trx<BookingsTable>(Tables.Bookings)
        .where({ event_id, user_id })
        .first();

      if (existingBooking) {
        throw new BadRequestException(
          "You have already booked a seat for this event"
        );
      }

      // All check passed, reserve
      const [booking] = await trx<BookingsTable>(Tables.Bookings)
        .insert({
          event_id,
          user_id,
        })
        .returning("*");

      if (!booking) {
        throw new InternalServerErrorException(
          "Failed to create booking - no data returned"
        );
      }

      return {
        bookingId: booking.id,
        eventId: booking.event_id,
        userId: booking.user_id,
        createdAt: booking.created_at,
        status: "confirmed",
      };
    });
  }
}
