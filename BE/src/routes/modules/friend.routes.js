import express from "express";
import {
  sendRequestFriend,
  acceptedRequestFriend,
} from "../../controller/friend.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = express.Router();
router.post("/request", authenticate, sendRequestFriend);
router.post("/accept", authenticate, acceptedRequestFriend);

export default router;
