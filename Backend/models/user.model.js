import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  soketId: { type: String },
});

userSchema.methods.generateAuthToken = async function () {
  return jwt.sign({ _id: this._id }, "ubersecretjainam", { expiresIn: "24h" });
};

userSchema.methods.comparePassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

userSchema.statics.hashPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};
const userModel = mongoose.model("User", userSchema);
export default userModel;
