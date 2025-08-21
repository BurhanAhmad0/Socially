import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const NotificationSchema = new Schema(
  {
    sender: {
      type: ObjectId,
      ref: "User",
    },
    reciever: {
      type: ObjectId,
      ref: "User",
    },
    notification: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

const NotificationModel = mongoose.model("Notification", NotificationSchema);

export default NotificationModel;
