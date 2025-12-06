import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import connectDB from "../db.js";
import routes from "./routes/index.js";
import { initializeSocket } from "./socket/socketHandler.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const socketService = initializeSocket(
  server,
  process.env.CORS_ORIGIN || "http://localhost:5173"
);

// Make socketService available globally
global.socketService = socketService;

const PORT = process.env.PORT || 3000;

// CORS Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Sử dụng tất cả route qua index.js
app.use("/api", routes);

// Server + DB bootstrap
const startServer = async () => {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log(`🚀 Server ready => http://localhost:${PORT}`);
      console.log(`🔌 Socket.io ready on ws://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Cannot start server:", error.message);
    process.exit(1);
  }
};

startServer();
