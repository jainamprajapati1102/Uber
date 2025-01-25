import { captainModel } from "../models/captain.model.js";
import { validationResult } from "express-validator";
import { createCaptain } from "../services/captain.service.js";
import { BlacklistToken } from "../models/blacklistedToken.model.js";

export const registerCaptain = async function (req, res) {
  try {
    const errors = validationResult(req);
    const { fullname, email, password, vehicle } = req.body;
    console.log(req.body);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }

    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicletype: vehicle.vehicletype,
    });
    const token = await captain.generateAuthToken();
    res.status(201).json({ token, captain });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const loginCaptain = async function (req, res) {
  try {
    const { password, email } = req.body;
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = await captain.generateAuthToken();
    res.status(200).json({ token, captain });
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

export const captProfile = (req, res) => {
  try {
    res.status(200).json({ captain: req.captain });
  } catch (error) {
    res.status(401).json(error.message);
  }
};

export const logoutCaptain = async (req, res) => {
  const token =
    req.cookies.cap_token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  await BlacklistToken.create({ token });
  res.status(200).json("you are logout");
};
