import express from "express";

import {
  registerUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  searchUsers,
} from "../../controller/user.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = express.Router();

// List users and search
router.get("/", authenticate, getAllUsers);
router.get("/search", authenticate, searchUsers);

// Create
router.post("/register", registerUser);

// Read / Update / Delete by id
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
