import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const captainSchema = mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "Firstname must be at least 3 character long"],
    },
    lastname: {
      type: String,
      minlength: [3, "lastname must be at least 3 character long"],
    },
  },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  soketId: { type: String },
  status: { type: String, enum: ["active", "inactive"], default: "inactive" },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [5, "Plate must be at least 5 characters long"],
      unique: true,
    },
    capacity: {
      type: Number,
      required: true,
      minlength: [1, "Capacity must be at least 1"],
    },
    vehicletype: {
      type: String,
      enum: ["car", "auto", "moto"],
      required: true,
    },
  },
  location: {
    lat: { type: Number },
    log: { type: Number },
  },
});

captainSchema.methods.generateAuthToken = async function () {
  return jwt.sign({ _id: this._id }, "ubersecretjainam", { expiresIn: "24h" });
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};
export const captainModel = mongoose.model("Captain", captainSchema);
