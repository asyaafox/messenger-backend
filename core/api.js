import { Router } from "express";
const router = Router();

import userApi from "../routes/user.routes.js";
import messageApi from "../routes/message.routes.js";

router.use("/user", userApi);
router.use("/message", messageApi);

export default router;
