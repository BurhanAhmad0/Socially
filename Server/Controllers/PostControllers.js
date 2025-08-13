import PostModel from "../Models/PostModel.js";
import UserModel from "../Models/UserModel.js";
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
            { folder: "posts" },
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

    const post = await PostModel.findById(postId).populate(
      "owner",
      "-password"
    );

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json({
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export {
  createPost,
  getFeedPost,
  getExplorePosts,
  getPostsByUsername,
  getPostById,
};
