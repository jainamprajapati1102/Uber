import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BlacklistToken } from "../models/blacklistedToken.model.js";

export const authUser = async (req, res, next) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization?.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ message: "unauthorized log" });
  }

  const isBlacklisted = await BlacklistToken.findOne({ token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "unauthorized black" });
  }
  try {
    const verifyUser = jwt.verify(token, "ubersecretjainam");
    if (!verifyUser) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const user = await userModel.findById({ _id: verifyUser._id });
    req.user = user;
    return next();
  } catch (error) {
    if (error.name == "jsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else if (error.name == "ToeknExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(500).json({ message: "Server Error" });
  }
};
