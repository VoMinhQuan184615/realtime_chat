import express from "express";
import { login, me, refresh } from "../../controller/auth.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.get("/me", authenticate, me);

export default router;
