import { Router } from "express";
import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";
import Members from "../models/member.model.js";
import User from "../models/user.model.js";
import authenticateToken from "../middlewares/auth.js";
const router = Router();
import { literal } from "sequelize";
import Op from "sequelize";
// router.post("/sendMessage", async (req, res) => {
//   // {recipient_id, recipient_type, text} = req.body;
//   res.send("Pososi");
// });

router.post("/send", authenticateToken, async (req, res) => {
  // #swagger.security = [{"BearerAuth": []}]
  try {
    const userId = req.user.userId;
    const { receiverId, text } = req.body;
    if (receiverId == userId) {
      return res.status(406).send({ error: "Receiver id cannot be your id" });
    }
    const receiver = await User.findOne({ where: { id: receiverId } });
    if (!receiver) {
      return res.status(400).json({ error: "No receiver with this id" });
    }
    let chat = await Chat.findOne({
      include: [
        {
          model: User,
          through: { model: Members, where: { UserId: [userId, receiverId] } },
          required: true,
        },
      ],
      group: ["Chat.id"],
    });
    console.log(chat);
    if (!chat) {
      chat = await Chat.create();
      await Members.bulkCreate([
        { UserId: userId, ChatId: chat.id },
        { UserId: receiverId, ChatId: chat.id },
      ]);
    }
    const message = await Message.create({
      Text: text,
      ChatId: chat.id,
      UserId: userId,
    });
    return res.status(200).json("Sent successfully");
  } catch (error) {
    console.error("Error in send message route", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
