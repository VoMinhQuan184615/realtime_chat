import express from "express";

import {
  sendDirectMessage,
  sendGroupMessage,
  getConversationMessages,
  markMessageAsSeen,
  markConversationAsRead,
  sendPublicMessage,
  getPublicMessages,
  getOnlineCount,
  getOnlineUsersList,
} from "../../controller/message.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { checkFriendship } from "../../middleware/friend.middleware.js";

const router = express.Router();

// Public chat routes
router.post("/public", authenticate, sendPublicMessage);
router.get("/public/history", getPublicMessages);
router.get("/online-count", getOnlineCount);
router.get("/online-users", getOnlineUsersList);

// Send direct message (check friendship)
router.post("/direct", authenticate, checkFriendship, sendDirectMessage);

// Send group message
router.post("/:conversationId/group", authenticate, sendGroupMessage);

// Get conversation messages
router.get("/:conversationId", authenticate, getConversationMessages);

// Mark single message as seen
router.put("/:messageId/seen", authenticate, markMessageAsSeen);

// Mark conversation as read
router.put("/:conversationId/read", authenticate, markConversationAsRead);

export default router;
