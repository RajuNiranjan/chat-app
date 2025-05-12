import { ChatModel } from "../models/chat.model.js";
import { getReceiverSocketId, io } from "../utils/socket.js";

export const getConversation = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { receiverId } = req.params;

    const conversation = await ChatModel.find({
      $or: [
        { senderId: userId, receiverId },
        { senderId: receiverId, receiverId: userId },
      ],
    });

    res.status(200).json(conversation);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { receiverId } = req.params;
    const { message, image } = req.body;

    if (!message && !image) {
      return res
        .status(400)
        .json({ message: "Message and image are required" });
    }

    const newMessage = new ChatModel({
      message,
      image,
      senderId: userId,
      receiverId,
    });

    await newMessage.save();

    const receiverSocketId = await getReceiverSocketId(receiverId);
    console.log("receiverSOcketId", receiverSocketId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Send message error:", error);
    next(error);
  }
};
