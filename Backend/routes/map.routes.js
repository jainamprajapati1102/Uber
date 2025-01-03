import express from "express";
import { authUser } from "../middleware/user.auth.middleware";
import { getAddressCoordinateController } from "../controller/map.controller";
import {query} from 'express-validator'
const router = express.Router();

router.get("/get-cordinates", authUser, getAddressCoordinateController);
export default router;
