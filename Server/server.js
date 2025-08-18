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

io.on("connection", (socket) => {
  console.log("New user connected ", socket.id);

  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
    // console.log("User joind room", socket.id);

    io.to(roomName).emit("roomJoined", {
      message: "User joined room",
      room: roomName,
      user: socket.id,
    });
  });

  socket.on("sendMessage", (data) => {
    // console.log(message);

    const { roomName, message, senderId, recieverId } = data;

    io.to(roomName).emit(
      "receiveMessage",
      {
        text: message,
        sender: senderId,
        reciever: recieverId,
        createdAt: new Date(),
      },
      async () => {
        const newMessage = await MessageModel.create({
          sender: senderId,
          reciever: recieverId,
          text: message,
        });
        newMessage.save();

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
      }
    );
  });
});

httpServer.listen(port, () => {
  console.log(`Example app listening on http://127.0.0.1:${port}`);
});
