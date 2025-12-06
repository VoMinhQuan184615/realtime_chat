import { Server } from "socket.io";

let onlineUsers = new Map(); // Map để lưu socket.id -> user info

export const initializeSocket = (server, corsOrigin) => {
  const io = new Server(server, {
    cors: {
      origin: corsOrigin || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // ✅ Get online user count
  const getOnlineCount = () => onlineUsers.size;

  // ✅ Broadcast online count
  const broadcastOnlineUsers = () => {
    const count = getOnlineCount();
    io.emit("online-users", count);
    console.log(`👥 Online users: ${count}`);
  };

  io.on("connection", (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    // ✅ Add user to online list immediately (without username initially)
    onlineUsers.set(socket.id, { socketId: socket.id, username: null });

    // Listen for user-info event from client
    socket.on("user-info", (userInfo) => {
      console.log(
        `👤 User info received from ${socket.id}:`,
        userInfo.username,
        userInfo.avatar
      );
      onlineUsers.set(socket.id, {
        ...userInfo,
        avatar: userInfo.avatar,
        socketId: socket.id,
      });
      broadcastOnlineUsers();
    });

    // Broadcast initial online count
    broadcastOnlineUsers();

    // ✅ Handle public messages
    socket.on("publicMessage", (data) => {
      console.log(`📨 Message from ${socket.id}:`, data.content);

      io.emit("publicMessage", {
        _id: data._id || `msg-${Date.now()}`,
        content: data.content,
        senderId: {
          _id: data.senderId,
          username: data.username,
          avatar: data.avatar,
        },
        timestamp: new Date().toISOString(),
      });
    });

    // ✅ Handle disconnect
    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
      onlineUsers.delete(socket.id);
      broadcastOnlineUsers();
    });

    // ✅ Handle errors
    socket.on("error", (error) => {
      console.error(`⚠️ Socket error for ${socket.id}:`, error);
    });
  });

  // Export io and helper functions
  return {
    io,
    getOnlineCount: () => getOnlineCount(),
    getOnlineUsers: () => Array.from(onlineUsers.values()),
  };
};
