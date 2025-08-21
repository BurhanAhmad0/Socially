import mongoose from "mongoose";
import RoomModel from "../Models/RoomModel.js";
import UserModel from "../Models/UserModel.js";
import MessageModel from "../Models/MessageModel.js";
import ConversationModel from "../Models/ConversationModel.js";

export default function chatHandler(io, socket) {
  const senderId = socket.user.userId; // from JWT
  //   console.log("New user connected ", senderId);

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
        sender: senderId,
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
}
