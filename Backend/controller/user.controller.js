import userModel from "../models/user.model.js";
import userService from "../services/user.service.js";
import createUser from "../services/user.service.js";
import { validationResult } from "express-validator";
export const registerController = async function (req, res, next) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { fullname, email, password } = req.body;

  const hashedPassword = await userModel.hashedPassword(password);

  const user = await createUser({ fullname, email, password: hashedPassword });
  const token = await user.generateToken();
  res.status(201).json({ token, user });
};
