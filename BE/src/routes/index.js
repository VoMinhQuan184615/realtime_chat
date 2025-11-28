import express from "express";
import userRoutes from "./modules/user.routes.js";
import authRoutes from "./modules/auth.routes.js";
import friendRoutes from "./modules/friend.routes.js";
import messageRoutes from "./modules/message.routes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/friends", friendRoutes);
router.use("/messages", messageRoutes);

export default router;
