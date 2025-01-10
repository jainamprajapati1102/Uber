import express from "express";
import { body, query } from "express-validator";
import { authUser } from "../middleware/user.auth.middleware.js";
import { calculatefareContgroller, crateRideController } from "../controller/ride.controller.js";
import { calculatefareService } from "../services/ride.service.js";
const router = express.Router();

router.post(
  "/create",
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  authUser,
  crateRideController
);

router.get(
  "/get-fare",
  query("pickup").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authUser,
  calculatefareContgroller
);

export default router;
