import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const MessageSchema = new Schema(
  {
    sender: {
      type: ObjectId,
      ref: "User",
    },
    reciever: {
      type: ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

const MessageModel = mongoose.model("Message", MessageSchema);

export default MessageModel;
