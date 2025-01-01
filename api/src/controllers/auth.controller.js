import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genToken } from "../utils/genToken.js";

export const Register = async (req, res) => {
  const { email, userName, password } = req.body;
  if (!email || !userName || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(403)
        .json({ message: "User already existed with this email" });
    }
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
      email,
      userName,
      password: hashPassword,
    });

    await newUser.save();

    const token = genToken(newUser._id);

    return res
      .status(201)
      .json({ message: "User register successfully", token });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  const { userNameOrEmail, password } = req.body;
  if (!userNameOrEmail || !password)
    return res.status(400).json({ message: "All fields are required" });
  try {
    const user = await UserModel.findOne({
      $or: [{ email: userNameOrEmail }, { userName: userNameOrEmail }],
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found with this email or username" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = genToken(user._id);

    return res
      .status(200)
      .json({ message: "User logged in successfully", token });
  } catch (error) {
    console.log(error);
  }
};
