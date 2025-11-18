import express from "express";

import {
  registerUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  searchUsers,
} from "../../controller/user.controller.js";

const router = express.Router();

// List users and search
router.get("/", getAllUsers);
router.get("/search", searchUsers);

// Create
router.post("/register", registerUser);

// Read / Update / Delete by id
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
