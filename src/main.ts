import "dotenv/config";

import express from "express";

import { BookingRouter } from "./modules/booking/booking.route";
import { errorHandler } from "./core/middleware/error.middleware";
import { db } from "./knex/db";

async function assertDatabaseConnectionOk() {
  console.log(`[DB] Checking database connection...`);
  try {
    await db.raw("select 1+1 as result");
    console.log("[DB] Database connection OK!");
  } catch (error) {
    console.log("[DB] Unable to connect to the database:", error);
    process.exit(1);
  }
}

async function main() {
  await assertDatabaseConnectionOk();

  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  const routers = [{ path: "/api/bookings", router: new BookingRouter() }];

  routers.forEach(({ path, router }) => {
    router.setupRoutes();
    app.use(path, router.getRouter());
    console.log(`Router registered: ${path}`);
  });

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main();
