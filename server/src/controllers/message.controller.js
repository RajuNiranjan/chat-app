import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

export const sendMessage = async (req, res) => {
  const { message, image } = req.body;
  const senderId = req.userId;
  const receiverId = req.params.receiverId;

  try {
    if (!message) {
      return res.status(400).json({ message: "message is required" });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "receiver not found" });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      image,
    });

    await newMessage.save();

    res.status(201).json({
      message: "message sent successfully",
      newMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Error sending message" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({ _id: { $ne: req.userId } }).select(
      "-password"
    );
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  const senderId = req.userId;
  const receiverId = req.params.receiverId;

  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
