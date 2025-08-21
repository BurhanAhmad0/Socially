import mongoose from "mongoose";
import UserModel from "../Models/UserModel.js";
import NotificationModel from "../Models/NotificationModel.js";
import NotificationRoomModel from "../Models/NotificationRoomModel.js";

export default function notificationHandler(io, socket) {
  const senderId = socket.user.userId;

  socket.on("joinNotificationRoom", (roomName) => {
    socket.join(roomName);
    console.log(`User ${senderId} joined ${roomName}`);
  });

  socket.on("sendNotification", async (data) => {
    const { roomName, notification, recieverId } = data;

    try {
      // 1. Ensure receiver exists
      const checkReciever = await UserModel.findById(recieverId);
      if (!checkReciever) {
        return socket.emit("errorMessage", {
          success: false,
          message: "Receiver not found",
        });
      }

      // 2. Save notification
      const newNotification = await NotificationModel.create({
        sender: senderId,
        reciever: recieverId,
        notification,
      });

      // 3. Ensure notification room exists
      const checkExistingNotifRoom = await NotificationRoomModel.findOne({
        // sender: senderId,
        owner: recieverId,
      });

      if (!checkExistingNotifRoom) {
        const newNotifRoom = new NotificationRoomModel({
          // sender: senderId,
          owner: recieverId,
          notifications: [newNotification._id],
        });
        await newNotifRoom.save();
      } else {
        await NotificationRoomModel.findOneAndUpdate(
          { owner: recieverId },
          { $push: { notifications: newNotification._id } },
          { new: true }
        );
      }

      // 4. Emit notification to the room
      io.to(roomName).emit("receiveNotification", {
        _id: newNotification._id,
        notification: newNotification.notification,
        sender: newNotification.sender,
        reciever: newNotification.reciever,
        createdAt: newNotification.createdAt,
      });
    } catch (error) {
      console.error("Error saving or broadcasting notification:", error);
      socket.emit("errorMessage", {
        success: false,
        message: "Could not send notification",
      });
    }
  });
}
