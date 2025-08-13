import express from "express";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware.js";
import {
  createPost,
  getFeedPost,
  getExplorePosts,
  getPostsByUsername,
  getPostById,
} from "../Controllers/PostControllers.js";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", AuthMiddleware, upload.single("image"), createPost);
router.get("/feed", AuthMiddleware, getFeedPost);
router.get("/explore", AuthMiddleware, getExplorePosts);
router.get("/user/:username", AuthMiddleware, getPostsByUsername);
router.get("/:postId", AuthMiddleware, getPostById);

export default router;
