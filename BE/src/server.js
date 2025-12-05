import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../db.js";
import routes from "./routes/index.js";
import { setupSocket } from "./socket/socketHandler.js";
import MessageService from "./service/message.service.js";
import ConversationService from "./service/conversation.service.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3001",
    credentials: true,
  },
});

const PORT = process.env.PORT || 3000;

// CORS Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// Middleware
app.use(cors());
app.use(express.json());

// Sử dụng tất cả route qua index.js
app.use("/api", routes);

// Setup WebSocket handlers with services
setupSocket(io, MessageService, ConversationService);

// Server + DB bootstrap
const startServer = async () => {
  try {
    await connectDB();

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server ready => http://localhost:${PORT}`);
      console.log(`📡 WebSocket ready => ws://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Cannot start server:", error.message);
    process.exit(1);
  }
};

startServer();

export { io };
