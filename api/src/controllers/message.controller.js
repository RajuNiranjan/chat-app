import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.userId;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("password");
    res.status(200).json({ filteredUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  const { receiverId } = req.params;
  const senderId = req.userId;
  try {
    const message = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });
    res.status(200).json({ message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  const { receiverId } = req.params;
  const senderId = req.userId;
  const { message } = req.body;
  try {
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    res.status(200).json({ newMessage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
