import PostModel from "../Models/PostModel.js";
import UserModel from "../Models/UserModel.js";
import CommentModel from "../Models/CommentModel.js";
import cloudinary from "../Utils/cloudinary.js";
import streamifier from "streamifier";

const createPost = async (req, res) => {
  try {
    let postImageUrl = "";
    const { text, image } = req.body;
    const userId = req.user?.userId;

    if (!text && !image) {
      return res
        .status(400)
        .json({ error: "Please provide text or an image to post." });
    }

    // ======== Image Upload ========
    if (req.file) {
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          message: "Invalid image type. Only JPG, PNG, and WebP allowed.",
        });
      }

      // Upload new image to Cloudinary
      const streamUpload = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "sociallyPostImages" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(buffer).pipe(stream);
        });
      };

      const result = await streamUpload(req.file.buffer);
      postImageUrl = result.secure_url;
    }

    const newPost = new PostModel({
      text: text?.trim(),
      image: postImageUrl,
      owner: userId,
    });

    const savedPost = await newPost.save();

    return res.status(201).json({
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getFeedPost = async (req, res) => {
  try {
    const feedPosts = await PostModel.find({}).populate("owner", "-password"); // exclude password from owner

    return res.status(200).json({
      message: "Feed posts",
      posts: feedPosts,
    });
  } catch (error) {
    console.error("Error fetching feed posts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getExplorePosts = async (req, res) => {
  try {
    const explorePosts = await PostModel.find({
      image: { $exists: true, $ne: "" }, // only posts with an image
    }).populate("owner", "-password");

    return res.status(200).json({
      message: "Explore posts with images",
      posts: explorePosts,
    });
  } catch (error) {
    console.error("Error fetching explore posts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getPostsByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    // Step 1: Find the user by username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Step 2: Find posts by the user's ObjectId
    const userPosts = await PostModel.find({
      owner: user._id,
    }).populate("owner", "-password");

    return res.status(200).json({
      message: `Posts by ${username}`,
      posts: userPosts,
    });
  } catch (error) {
    console.error("Error fetching posts by username:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.user;

    const post = await PostModel.findById(postId).populate(
      "owner",
      "-password"
    );

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const liked = post.likes.includes(userId);

    return res.status(200).json({
      message: "Post fetched successfully",
      post: {
        ...post.toObject(), // convert Mongoose doc to plain object
        liked, // add custom field
      },
    });
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.user;

    const post = await PostModel.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: userId } }, // prevents duplicate likes
      { new: true }
    );

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      message: "Post liked successfully",
      likes: post.likes, // return updated like count
      post,
    });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const dislikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.user;

    const post = await PostModel.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } }, // prevents duplicate likes
      { new: true }
    );

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      message: "Post unliked successfully",
      likes: post.likes, // return updated like count
      post,
    });
  } catch (error) {
    console.error("Error unliking post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.user;
    const { comment } = req.body;

    const newComment = new CommentModel({
      comment,
      owner: userId,
      post: postId,
    });
    newComment.save();

    if (!newComment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment is not added" });
    }

    res.status(200).json({
      success: true,
      message: "Comment Posted successfully",
      newComment, // return updated like count
    });
  } catch (error) {
    console.error("Error commenting post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getComment = async (req, res) => {
  try {
    const { postId } = req.params;

    // Fetch all comments for the given post
    const comments = await CommentModel.find({ post: postId })
      .populate("owner", "name avatar") // only return needed fields
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export {
  createPost,
  getFeedPost,
  getExplorePosts,
  getPostsByUsername,
  getPostById,
  likePost,
  dislikePost,
  addComment,
  getComment,
};
