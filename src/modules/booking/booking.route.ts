import { BaseRouter } from "../../core/base/base-router";
import { db } from "../../knex/db";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";

export class BookingRouter extends BaseRouter {
  private readonly bookingController: BookingController;
  constructor() {
    super();
    const bookingService = new BookingService(db);
    this.bookingController = new BookingController(bookingService);
  }
  override setupRoutes(): void {
    this.router.post(
      "/reserve",
      this.bookingController.reserveSeats.bind(this.bookingController)
    );
  }
}
