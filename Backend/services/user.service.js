import userModel from "../models/user.model";

export default createUser = async ({ fullname, email, password }) => {
  if (!fullname || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = userModel.create({ fullname, email, password });
  return user;
};
