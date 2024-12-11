import userModel from "../models/user.model.js";

export const createUser = async ({
  firstname,
  lastname,
  email,
  password,
  mobile,
}) => {
  if (!firstname || !email || !password || !mobile) {
    throw new Error("All fields are required");
  }
  const user = await userModel.create({
    fullname: { firstname, lastname },
    email,
    password,
    mobile,
  });
  return user;
};
