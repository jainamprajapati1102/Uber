import express from "express";
import { authUser } from "../middleware/user.auth.middleware.js";
import {
  getAddressCoordinateController,
  getDistanceTimeController,
  getSuggestionController,
} from "../controller/map.controller.js";
import { query } from "express-validator";
const router = express.Router();

router.get(
  "/get-cordinates",
  query("address").isString().isLength({ min: 3 }),
  authUser,
  getAddressCoordinateController
);

router.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authUser,
  getDistanceTimeController
);
router.get(
  "/get-suggestion",
  query("input").isString().isLength({ min: 1 }),
  authUser,
  getSuggestionController
);



export default router;
