import { captainModel } from "../models/captain.model.js";
import { BlacklistToken } from "../models/blacklistedToken.model.js";
import jwt from "jsonwebtoken";
export const authCapt = async (req, res, next) => {
  try {
    const token =
      req.cookies.cap_token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    const isBlacklisted = await BlacklistToken.findOne({ token });

    if (!token) {
      return res.status(401).json("unauthorized person");
    }

    if (isBlacklisted) {
      return res.status(401).json("unauthorized person");
    }

    const varifyCapt = jwt.verify(token, "ubersecretjainam");
    const captain = await captainModel.findById({ _id: varifyCapt._id });
    req.captain = captain;
    return next();
  } catch (error) {
    if (error.name == "jsonWebTokenError") {
      return res.status(401).json({ msg: "Invalid Token" });
    } else if (error.name == "ToeknExpiredError") {
      return res.status(401).json({ msg: "Token Expired" });
    }
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
