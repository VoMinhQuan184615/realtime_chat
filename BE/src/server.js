import express from "express";
import dotenv from "dotenv";
import connectDB from "../db.js";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Sử dụng tất cả route qua index.js
app.use("/api", routes);

// Server + DB bootstrap
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server ready => http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Cannot start server:", error.message);
    process.exit(1);
  }
};

startServer();
