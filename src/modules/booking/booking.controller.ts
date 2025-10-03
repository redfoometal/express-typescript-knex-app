import { NextFunction, Request, Response } from "express";
import { BookingService } from "./booking.service";
import { BadRequestException } from "../../core/exceptions";

export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  async reserveSeats(req: Request, res: Response, next: NextFunction) {
    try {
      const { event_id, user_id } = req.body;

      if (!event_id || !user_id) {
        throw new BadRequestException(
          "Missing required fields: event_id and user_id are required"
        );
      }

      const result = await this.bookingService.reserveSeats({
        event_id: Number(event_id),
        user_id,
      });

      res.status(200).json({
        success: true,
        data: result,
        message: "Seats reserved successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
