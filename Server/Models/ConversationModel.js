import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const ConversationSchema = new Schema(
  {
    owner: {
      type: ObjectId,
      ref: "User",
    },
    conversations: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

const ConversationModel = mongoose.model("Conversation", ConversationSchema);

export default ConversationModel;
