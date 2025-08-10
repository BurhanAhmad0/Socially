import express from "express";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware.js";
import multer from "multer";
import {
  getUser,
  getUserByUsername,
  updateUserProfile,
  followUserProfile,
  unfollowUserProfile,
  deleteUserAccount,
  getSuggestionUsers,
} from "../Controllers/UserController.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", AuthMiddleware, getUser);
router.get("/suggestions", AuthMiddleware, getSuggestionUsers);
router.get("/:username", AuthMiddleware, getUserByUsername);
router.put(
  "/update",
  AuthMiddleware,
  upload.single("image"),
  updateUserProfile
);
router.put("/follow/:username", AuthMiddleware, followUserProfile);
router.put("/unfollow/:username", AuthMiddleware, unfollowUserProfile);
router.delete("/delete", AuthMiddleware, deleteUserAccount);

export default router;
