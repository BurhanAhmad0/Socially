import mongoose, { Schema } from "mongoose";
import { ref } from "process";

const { ObjectId } = mongoose.Schema.Types;

const RoomSchema = new Schema(
  {
    user1: {
      type: ObjectId,
      ref: "User",
    },
    user2: {
      type: ObjectId,
      ref: "User",
    },
    messages: [
      {
        type: ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

const RoomModel = mongoose.model("Room", RoomSchema);

export default RoomModel;
