import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { ErrorMiddleware } from "../middlewares/error.middleware.js";
import bcrypt from "bcryptjs";

export const RegisterUser = async (req, res, next) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password)
    return next(ErrorMiddleware("all fields are required", 400));

  try {
    const user = await User.findOne({ $or: [{ userName }, { email }] });
    if (user) return next(ErrorMiddleware("user already exists", 400));

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
    next(ErrorMiddleware(error));
  }
};

export const LoginUser = async (req, res, next) => {
  const { emailOrUserName, password } = req.body;

  if (!emailOrUserName || !password)
    return next(ErrorMiddleware("all fields are required", 400));

  try {
    const user = await User.findOne({
      $or: [{ userName: emailOrUserName }, { email: emailOrUserName }],
    });
    if (!user) return next(ErrorMiddleware("user not found", 404));

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return next(ErrorMiddleware("invalid credentials", 400));

    const token = generateToken(user._id);

    res.status(200).json({ message: "user logged in successfully", token });
  } catch (error) {
    next(ErrorMiddleware(error));
  }
};

export const GetMe = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId).select("-password");
  if (!user) return next(ErrorMiddleware("user not found", 404));
  res.status(200).json({ user });
};
