import express from "express";

import { sendDirectMessage } from "../../controller/message.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { checkFriendship } from "../../middleware/friend.middleware.js";
const router = express.Router();
router.post("/direct", authenticate, checkFriendship, sendDirectMessage);

export default router;
