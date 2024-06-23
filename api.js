import { Router } from "express";
const router = Router();

import userApi from "./routes/user.routes.js";
import authApi from "./routes/auth.routes.js";

router.use("/user", userApi);
router.use("/auth", authApi);

export default router;
