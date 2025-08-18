import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cloudinary from "../Utils/cloudinary.js";
import streamifier from "streamifier";
import ConversationModel from "../Models/ConversationModel.js";

const getUser = async (req, res) => {
  try {
    const token = req.cookies.SESSION_TOKEN;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        message: "User is not authenticated",
      });
    }

    const user = await User.findById(decoded.userId).select("-password");

    // Optionally, you can also fetch full user details from DB here using decoded.userId
    res.status(200).json({
      message: "User authenticated successfully",
      user,
    });
  } catch (error) {
    console.error("Get user error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const { username } = req.params;

    if (!username) {
      return res
        .status(400)
        .json({ message: "Username parameter is required." });
    }

    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isFollowing = user.followers.includes(currentUserId);
    const isCurrentUser = currentUserId === user._id.toString();

    res.status(200).json({
      message: "User retrieved successfully",
      user,
      isFollowing,
      isCurrentUser,
    });
  } catch (error) {
    console.error("Get user by username error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserConversations = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      // console.log("User id is undefined");
      return res.status(404).send("User id is undefined");
    }

    const contactList = await ConversationModel.findOne({
      owner: userId,
    }).populate("conversations");

    if (!contactList) {
      return res.status(200).json({
        success: true,
        conversations: [],
        message: "No contacts found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Conversation list",
      conversations: contactList.conversations,
    });
  } catch (error) {
    console.error("Error fetching user conversations:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user ID provided." });
    }

    const { name, username, email, currentPassword, newPassword } = req.body;
    const updateFields = {};

    // Fetch user only if needed later
    let existingUser = null;

    // ======== Image Upload ========
    if (req.file) {
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          message: "Invalid image type. Only JPG, PNG, and WebP allowed.",
        });
      }

      // Fetch user now to remove old image if needed
      existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found." });
      }

      // Remove old image from Cloudinary
      if (existingUser.imagePublicId) {
        await cloudinary.uploader.destroy(existingUser.imagePublicId);
      }

      // Upload new image to Cloudinary
      const streamUpload = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "sociallyProfilePics" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(buffer).pipe(stream);
        });
      };

      const result = await streamUpload(req.file.buffer);
      updateFields.avatar = result.secure_url;
      updateFields.imagePublicId = result.public_id;
    }

    // ======== Username Update ========
    if (username) {
      const usernameTaken = await User.findOne({
        username,
        _id: { $ne: userId },
      });
      if (usernameTaken) {
        return res.status(400).json({ message: "Username is already taken." });
      }
      updateFields.username = username;
    }

    // ======== Email Update ========
    if (email) {
      const emailTaken = await User.findOne({ email, _id: { $ne: userId } });
      if (emailTaken) {
        return res.status(400).json({ message: "Email is already in use." });
      }
      updateFields.email = email;
    }

    // ======== Name Update ========
    if (name) {
      const nameParts = name.trim().split(" ");
      updateFields.firstName = nameParts[0];
      updateFields.lastName = nameParts.slice(1).join(" ") || "";
    }

    // ======== Password Update ========
    if (newPassword || currentPassword) {
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          message:
            "Both current and new passwords are required to change password.",
        });
      }

      if (!existingUser) {
        existingUser = await User.findById(userId);
        if (!existingUser) {
          return res.status(404).json({ message: "User not found." });
        }
      }

      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        existingUser.password
      );
      if (!isPasswordMatch) {
        return res
          .status(401)
          .json({ message: "Current password is incorrect." });
      }

      if (currentPassword === newPassword) {
        return res.status(400).json({
          message: "New password must be different from the current password.",
        });
      }

      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters long." });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateFields.password = hashedPassword;
    }

    // ======== Prevent Empty Updates ========
    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ message: "No changes provided to update." });
    }

    // ======== Update User in DB ========
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found after update." });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getSuggestionUsers = async (req, res) => {
  try {
    const currentUserId = req.user.userId;

    // Fetch the current user's following list
    const currentUser = await User.findById(currentUserId).select("following");

    const excludedUserIds = [
      currentUserId, // Exclude current user
      ...currentUser.following, // Exclude already followed users
    ];

    // Get users not followed and not self
    const users = await User.find({
      _id: { $nin: excludedUserIds },
    })
      .select("-password") // Exclude sensitive info
      .limit(3); // Optional limit

    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      message: "Suggested Users",
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const followUserProfile = async (req, res) => {
  try {
    const currentUserId = req.user?.userId; // ID of the authenticated user
    const targetUsername = req.params.username; // Username of the user to follow

    // Ensure the username is provided
    if (!targetUsername) {
      return res.status(400).json({ error: "Target username is required." });
    }

    // Find target user by username
    const targetUser = await User.findOne({ username: targetUsername });
    if (!targetUser) {
      return res.status(404).json({ error: "Target user not found." });
    }

    // Prevent self-follow
    if (targetUser._id.toString() === currentUserId) {
      return res.status(400).json({ error: "You cannot follow yourself." });
    }

    // Fetch current user
    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res.status(404).json({ error: "Authenticated user not found." });
    }

    // Check if already following
    const alreadyFollowing = currentUser.following.includes(targetUser._id);
    if (alreadyFollowing) {
      return res
        .status(400)
        .json({ error: "You are already following this user." });
    }

    // Perform follow
    currentUser.following.push(targetUser._id);
    targetUser.followers.push(currentUser._id);

    await currentUser.save();
    await targetUser.save();

    res
      .status(200)
      .json({ message: `You are now following @${targetUsername}.` });
  } catch (error) {
    console.error("Follow User Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const unfollowUserProfile = async (req, res) => {
  try {
    const currentUserId = req.user?.userId; // ID of the authenticated user
    const targetUsername = req.params.username; // Username of the user to unfollow

    // Ensure username is provided
    if (!targetUsername) {
      return res.status(400).json({ error: "Target username is required." });
    }

    // Find target user by username
    const targetUser = await User.findOne({ username: targetUsername });
    if (!targetUser) {
      return res.status(404).json({ error: "Target user not found." });
    }

    // Prevent self-unfollow
    if (targetUser._id.toString() === currentUserId) {
      return res.status(400).json({ error: "You cannot unfollow yourself." });
    }

    // Fetch current user
    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res.status(404).json({ error: "Authenticated user not found." });
    }

    // Check if the user is actually following the target
    const isFollowing = currentUser.following.includes(targetUser._id);
    if (!isFollowing) {
      return res
        .status(400)
        .json({ error: "You are not following this user." });
    }

    // Remove target from following and follower lists
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== targetUser._id.toString()
    );
    targetUser.followers = targetUser.followers.filter(
      (id) => id.toString() !== currentUser._id.toString()
    );

    await currentUser.save();
    await targetUser.save();

    res
      .status(200)
      .json({ message: `You have unfollowed @${targetUsername}.` });
  } catch (error) {
    console.error("Unfollow User Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized access." });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res
      .clearCookie("SESSION_TOKEN", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/", // ensure this matches the original cookie path
      })
      .status(200)
      .json({ message: "User account deleted successfully." });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export {
  getUser,
  getUserByUsername,
  updateUserProfile,
  followUserProfile,
  unfollowUserProfile,
  deleteUserAccount,
  getSuggestionUsers,
  getUserConversations,
};
