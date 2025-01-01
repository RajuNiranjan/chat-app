import { MessageModel } from "../models/message.model.js";
import { UserModel } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
export const GetAllUser = async (req, res) => {
  const { userId } = req.userId;
  try {
    const allUser = await UserModel.find({ _id: { $ne: userId } }).select(
      "-password"
    );
    return res.status(200).json({ message: "All users", users: allUser });
  } catch (error) {
    console.log(error);
  }
};

export const GetConversation = async (req, res) => {
  const { id: userToChatId } = req.params;
  const { userId: senderId } = req.userId;
  try {
    const messages = await MessageModel.find({
      $or: [
        { senderId: senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId },
      ],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
  }
};

export const SendMessage = async (req, res) => {
  const { text, image } = req.body;
  const { id: receiverId } = req.params;
  const { userId: senderId } = req.userId;
  try {
    let imageUrl;

    if (image) {
      const uploadRes = cloudinary.uploader.upload(image);
      imageUrl = await uploadRes.secure_url;
    }

    const newMessage = new MessageModel.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
  }
};
