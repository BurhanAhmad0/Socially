import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const NotificationRoomSchema = new Schema(
  {
    owner: {
      type: ObjectId,
      ref: "User",
    },
    notifications: [
      {
        type: ObjectId,
        ref: "Notification",
      },
    ],
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

const NotificationRoomModel = mongoose.model(
  "NotificationRoom",
  NotificationRoomSchema
);

export default NotificationRoomModel;
