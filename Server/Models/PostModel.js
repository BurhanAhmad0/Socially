import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new Schema(
  {
    text: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    owner: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;
