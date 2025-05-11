import { UserModel } from "../models/user.model.js";
import { genToken } from "../utils/genToken.js";
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
  const { userName, email, password } = req.body;

  if (!password || !email || !userName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await UserModel.findOne({ $or: [{ email }, { userName }] });

    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists with this email or username" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const profilePicture = `https://avatar.iran.liara.run/username?username=${userName}`;

    const newUser = new UserModel({
      email,
      userName,
      profilePicture,
      password: hashedPassword,
    });

    if (newUser) {
      genToken(newUser._id, res);
      await newUser.save();
    }

    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { emailOrUserName, password } = req.body;

  if (!password || !emailOrUserName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await UserModel.findOne({
      $or: [{ email: emailOrUserName }, { userName: emailOrUserName }],
    });

    if (!user) {
      throw new Error("user not found");
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      throw new Error("Invalid credentials");
    }

    if (user) {
      genToken(user._id, res);
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json(userResponse);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const checkAuth = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      throw new Error("user not found");
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
