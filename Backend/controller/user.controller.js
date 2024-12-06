import userModel from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import { BlacklistToken } from "../models/blacklistedToken.model.js";

export const registerUser = async function (req, res, next) {
  try {
    const { fullname, email, password } = req.body;
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error });
    }
    const hashedPassword = await userModel.hashPassword(password);
    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ user });
  } catch (error) {
    res.send(error.message);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid Email and password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email and password" });
    }
    const token = await user.generateAuthToken();
    res.cookie("token", token);
    res.json({ token, user });
  } catch (error) {
    res.send(error.message);
  }
};

export const getUserProfile = async (req, res) => {
  res.status(200).json({ user: req.user });
};

export const logoutUser = async (req, res) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  console.log("controller token: " + token);

  await BlacklistToken.create({ token });

  res.json({ message: "User logged out" });
};
