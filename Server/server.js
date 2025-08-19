import express from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./Routes/AuthRoutes.js";
import userRoutes from "./Routes/UserRoutes.js";
import postRoutes from "./Routes/PostRoutes.js";
import messageRoutes from "./Routes/MessageRoutes.js";
import { connectDB } from "./Utils/connectDB.js";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import RoomModel from "./Models/RoomModel.js";
import MessageModel from "./Models/MessageModel.js";
import ConversationModel from "./Models/ConversationModel.js";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import UserModel from "./Models/UserModel.js";

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
  const { userId } = socket.user; // from JWT
  console.log("New user connected ", socket.id, userId);

  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
    // console.log("User joind room", socket.id);

    // io.to(roomName).emit("roomJoined", {
    //   message: "User joined room",
    //   room: roomName,
    //   user: socket.id,
    // });
  });

  socket.on("sendMessage", async (data) => {
    // console.log(message);

    const { roomName, message, recieverId } = data;

    const checkReciever = await UserModel.findById(recieverId);
    if (!checkReciever) {
      return socket.emit("errorMessage", {
        success: false,
        message: "Receiver not found",
      });
    }

    io.to(roomName).emit(
      "receiveMessage",
      {
        text: message,
        sender: userId,
        reciever: recieverId,
        createdAt: new Date(),
      },
      async () => {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
          const newMessage = await MessageModel.create({
            sender: senderId,
            reciever: recieverId,
            text: message,
          });

          // Normalize IDs to avoid duplicate rooms
          const [userA, userB] = [senderId, recieverId].sort();

          const checkExistingRoom = await RoomModel.findOne({
            user1: userA,
            user2: userB,
          });

          // console.log(checkExistingRoom);

          if (!checkExistingRoom) {
            const newRoom = new RoomModel({
              user1: userA,
              user2: userB,
              messages: [newMessage._id],
            });
            await newRoom.save();
          } else {
            await RoomModel.findOneAndUpdate(
              { user1: userA, user2: userB },
              { $push: { messages: newMessage._id } },
              { new: true }
            );
          }

          // Update sender's conversation list (add receiver if not exists)
          await ConversationModel.findOneAndUpdate(
            { owner: senderId },
            { $addToSet: { conversations: recieverId } }, // $addToSet prevents duplicates
            { upsert: true, new: true } // upsert in case user doesn't have a list yet
          );

          // Update receiver's conversation list (add sender if not exists)
          await ConversationModel.findOneAndUpdate(
            { owner: recieverId },
            { $addToSet: { conversations: senderId } },
            { upsert: true, new: true }
          );

          await session.commitTransaction();
          session.endSession();
        } catch (error) {
          await session.abortTransaction();
          session.endSession();
          console.error("Transaction failed:", error);
        }
      }
    );
  });
});

httpServer.listen(port, () => {
  console.log(`Example app listening on http://127.0.0.1:${port}`);
});
