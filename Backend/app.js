import dotenv from "dotenv";
dotenv.config(); // This loads the variables from the .env file
import express from "express";
import db from "./db/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
import maps from "./routes/map.routes.js";
import rideRoutes from "./routes/ride.routes.js";
const app = express();
import morgan from "morgan";
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json()); // Parses JSON payloads
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/user", userRoutes);
app.use("/captain", captainRoutes);
app.use("/maps", cors(), maps);
app.use("/ride", rideRoutes);

export default app;
