import { Router } from "express";

const router = Router();

router.post("/sendMessage", async (req, res) => {
  // {recipient_id, recipient_type, text} = req.body;
  res.send("Pososi");
});

export default router;
