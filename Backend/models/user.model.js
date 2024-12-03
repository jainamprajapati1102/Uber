import mongoose from "mongoose";
import { bcrypt } from "bcrypt";
import { jwt } from "jsonwebtoken";
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
  password: { type: String, required: true },
  soketId: { type: String, required: true },
});

userSchema.methods.generateAuthToken = async = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

userSchema.methods.comparerPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

export default userModel = mongoose.model("User", userSchema);
