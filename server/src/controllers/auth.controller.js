import { genToken } from "../lib/utils.js";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const Register = async (req, res) => {
  const { email, fullName, password } = req.body;
  const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,15}$/;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    if (!pattern.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least one uppercase letter, one number, one special character, and be 6-15 characters long.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      email,
      fullName,
      password: hashPassword,
    });

    await newUser.save();

    const token = genToken(newUser._id);

    const userResponse = newUser.toObject();
    delete userResponse.password;

    return res.status(201).json({
      message: "User registered successfully",
      token,
      userResponse,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const LogIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const token = genToken(user._id);

    const userResponse = user.toObject();
    delete userResponse.password;

    return res
      .status(200)
      .json({ message: "User logined successfully", token, userResponse });
  } catch (error) {
    res.status(500).json({ message: `Internal server error`, error });
  }
};

export const LogOut = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: `Internal server error`, error });
  }
};
