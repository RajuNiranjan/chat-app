import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const RegisterUser = async (req, res, next) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password)
    return res.status(400).json({ message: "all fields are required" });

  try {
    const user = await User.findOne({ $or: [{ userName }, { email }] });
    if (user) return res.status(400).json({ message: "user already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({ message: "user created successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const LoginUser = async (req, res, next) => {
  const { emailOrUserName, password } = req.body;

  if (!emailOrUserName || !password)
    return res.status(400).json({ message: "all fields are required" });

  try {
    const user = await User.findOne({
      $or: [{ userName: emailOrUserName }, { email: emailOrUserName }],
    });
    if (!user) return res.status(404).json({ message: "user not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "invalid credentials" });

    const token = generateToken(user._id);

    res.status(200).json({ message: "user logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const GetMe = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId).select("-password");
  if (!user) return res.status(404).json({ message: "user not found" });
  res.status(200).json({ user });
};
