import express from "express";
import { body, query } from "express-validator";
import { authUser } from "../middleware/user.auth.middleware.js";
import {
  calculatefareContgroller,
  confirmRideController,
  crateRideController,
  startRideController,
  endRideController,
} from "../controller/ride.controller.js";
import { calculatefareService } from "../services/ride.service.js";
import { authCapt } from "../middleware/capt.auth.middleware.js";
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

router.post(
  "/confirmride",
  authCapt,
  body("rideId").isMongoId().withMessage("Invalid rideId"),
  confirmRideController
);

router.get(
  "/start-ride",
  authCapt,
  query("rideId").isMongoId().withMessage("Invalid rideId"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid otp"),
  startRideController
);
router.post(
  "/end-ride",
  authCapt,
  body("rideId").isMongoId().withMessage("Invalid rideId"),
  endRideController
);
export default router;
