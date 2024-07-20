import { Router } from "express";
import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";
import Members from "../models/member.model.js";
import User from "../models/user.model.js";
import authenticateToken from "../middlewares/auth.js";
const router = Router();
import { literal } from "sequelize";
// router.post("/sendMessage", async (req, res) => {
//   // {recipient_id, recipient_type, text} = req.body;
//   res.send("Pososi");
// });

router.post("/send", authenticateToken, async (req, res) => {
  // #swagger.security = [{"BearerAuth": []}]
  try {
    const userId = req.user.userId;
    const { receiverId, text } = req.body;
    const receiver = await User.findOne({ where: { id: receiverId } });
    if (!receiver) {
      return res.status(400).json({ error: "No receiver with this id" });
    }
    // Find a chat that includes both the sender and the receiver
    let chat = await Chat.findOne({
      include: [
        {
          model: Members,
          as: "members",
          where: {
            [Op.or]: [{ UserId: userId }, { UserId: receiverId }],
          },
        },
      ],
      group: ["Chat.id"],
      having: sequelize.literal("COUNT(DISTINCT members.UserId) = 2"),
    });
    if (!chat) {
      chat = await Chat.create({ chatName: "New chaaat" });
      await Members.bulkCreate([
        { UserId: userId, ChatId: chat.id },
        { UserId: receiverId, ChatId: chat.id },
      ]);
    }
    const message = await Message.create({
      content: messageContent,
      ChatId: chat.id,
      UserId: userId,
    });

    return res.json({ chat, message });

    return res.status(200).json("Sent successfully");
  } catch (error) {
    console.error("Error in send message route", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
