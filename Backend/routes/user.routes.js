import express from "express";
import { body } from "express-validator";
const router = express.Router();
import { registerController } from "../controller/user.controller";
router.post(
  "register",
  [
    body("email").isEmail().withMessage("Invalid Message"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body(fullname.firstname)
      .isLength({ min: 3 })
      .withMessage("name must be at least 3 characters long"),
  ],
  registerController
);

export default router;
