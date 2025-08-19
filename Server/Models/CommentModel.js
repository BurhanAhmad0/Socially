import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const CommentSchema = new Schema(
  {
    comment: {
      type: String,
      trim: true,
    },
    owner: {
      type: ObjectId,
      ref: "User",
    },
    post: { type: ObjectId, ref: "Post", required: true },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

const CommentModel = mongoose.model("Comment", CommentSchema);

export default CommentModel;
