import express from "express";
import { body } from "express-validator";
import {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  getUserProfileAll,
} from "../controller/user.controller.js";
import { authUser } from "../middleware/user.auth.middleware.js";
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
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginUser
);

router.get("/profile", authUser, getUserProfile);
router.get("/profileall", getUserProfileAll);
router.get("/logout", authUser, logoutUser,authUser);
export default router;
