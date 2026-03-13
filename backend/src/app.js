import express from "express";

import authRoutes from "./interfaces/routes/auth.routes.js";
// import roomRoutes from "./interfaces/routes/room.routes.js";
// import bookingRoutes from "./interfaces/routes/booking.routes.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
// app.use("/rooms", roomRoutes);
// app.use("/bookings", bookingRoutes);

export default app;