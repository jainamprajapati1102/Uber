import express from "express";
import { body } from "express-validator";
import {
  captProfile,
  loginCaptain,
  logoutCaptain,
  registerCaptain,
} from "../controller/captain.controller.js";
import { authCapt } from "../middleware/capt.auth.middleware.js";

const router = express.Router();
router.post(
  "/register",
  [
    body("fullname.firstname")
      .notEmpty()
      .withMessage("Firstname is required")
      .isLength({ min: 3 })
      .withMessage("Firstname must be at least 3 characters long")
      .trim(),

    body("fullname.lastname")
      .optional()
      .isString()
      .withMessage("Lastname must be a string")
      .trim(),

    body("email")
      .isEmail()
      .withMessage("Please provide a valid email address")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .trim(),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate No. must be at least 3 characters long"),
    body("vehicle.capacity")
      .isLength({ min: 1 })
      .withMessage("Capacity of vehicle must be at least 1 "),
    body("vehicle.vehicletype")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginCaptain
);

router.get("/profile", authCapt, captProfile);
router.get("/logout", authCapt, logoutCaptain);
export default router;
