import MessageModel from "../models/Messages.js";
import { format } from "date-fns";
export const message = async (req, res) => {
  try {
    const { text, tags, user } = req.body;
    const newMessage = await MessageModel({
      user: user,
      text: text,
      key: Date.now(),
      tags: tags,
      dateOfCreate: format(new Date(), "dd.MM.yyyy HH:mm"),
    });
    const message = await newMessage.save();
    const allMessages = await MessageModel.find().exec();
    res.json({ newMessage, allMessages });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: " fault during post message(message)",
    });
  }
};
export const getMessages = async (req, res) => {
  try {
    const allMessages = await MessageModel.find().exec();
    const allUnicTags = await MessageModel.distinct("tags");

    res.json({ allMessages, allUnicTags });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: " fault during get messages(enter)",
    });
  }
};
