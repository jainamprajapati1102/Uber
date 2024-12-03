import express from "express";
import db from "./db/db.js";
import { configDotenv } from "dotenv";
import cors from "cors";
configDotenv();
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
export default app;
