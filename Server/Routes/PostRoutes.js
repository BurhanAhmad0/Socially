import express from "express";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware.js";
import {
  createPost,
  getFeedPost,
  getExplorePosts,
  getPostsByUsername,
  getPostById,
  likePost,
  dislikePost,
  addComment,
  getComment,
} from "../Controllers/PostControllers.js";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", AuthMiddleware, upload.single("image"), createPost);
router.get("/feed", AuthMiddleware, getFeedPost);
router.get("/explore", AuthMiddleware, getExplorePosts);
router.get("/user/:username", AuthMiddleware, getPostsByUsername);
router.put("/like/:postId", AuthMiddleware, likePost);
router.put("/unlike/:postId", AuthMiddleware, dislikePost);
router.post("/comment/:postId", AuthMiddleware, addComment);
router.get("/comment/:postId", AuthMiddleware, getComment);
router.get("/:postId", AuthMiddleware, getPostById);

export default router;
