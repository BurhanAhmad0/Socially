import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./Utils/connectDB.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import http from "http";
import cookie from "cookie";

import chatHandler from "./Sockets/chat.js";
import notificationHandler from "./Sockets/notification.js";

import authRoutes from "./Routes/AuthRoutes.js";
import userRoutes from "./Routes/UserRoutes.js";
import postRoutes from "./Routes/PostRoutes.js";
import messageRoutes from "./Routes/MessageRoutes.js";
import notificationRoutes from "./Routes/NotificationRoutes.js";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URI,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const port = 3000;

app.use(express.static("public"));
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    methods: ["PUT", "DELETE", "POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Connecting Database
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to Socially Server!");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);

io.use((socket, next) => {
  // Parse cookies from the handshake headers
  const cookies = cookie.parse(socket.handshake.headers.cookie || "");
  const SESSION_TOKEN = cookies.SESSION_TOKEN; // adjust name to match your cookie

  if (!SESSION_TOKEN) {
    return next(new Error("Authentication error: Token missing"));
  }
  // console.log(SESSION_TOKEN);

  try {
    const user = jwt.verify(SESSION_TOKEN, process.env.JWT_SECRET);
    socket.user = user; // safe to attach, but ensure payload is minimal
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new Error("Authentication error: Token expired"));
    }
    return next(new Error("Authentication error: Invalid token"));
  }
});

io.on("connection", (socket) => {
  // console.log("New user connected ", socket.id);

  // Attach chat logic
  chatHandler(io, socket);

  // Attach notification logic
  notificationHandler(io, socket);
});

httpServer.listen(port, () => {
  console.log(`Example app listening on http://127.0.0.1:${port}`);
});
