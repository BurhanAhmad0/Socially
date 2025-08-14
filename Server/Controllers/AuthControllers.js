import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    if (!name || !email || !password || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const checkUsername = await User.findOne({
      username: name.split(" ")[0].toLowerCase(),
    });
    if (checkUsername) {
      return res.status(409).json({ message: "Username already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
      username: name.split(" ")[0].toLowerCase(),
      email,
      password: hashedPassword,
      gender,
    });

    await newUser.save();

    const SESSION_TOKEN = jwt.sign(
      {
        userId: newUser._id,
        avatar: newUser.avatar,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        email: newUser.email,
        gender: newUser.gender,
        joinedSince: newUser.createdAt,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("SESSION_TOKEN", SESSION_TOKEN, {
      httpOnly: true,
      secure: true,
      sameSite: "None", // allows cross-site cookies
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        userId: newUser._id,
        avatar: newUser.avatar,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        email: newUser.email,
        gender: newUser.gender,
        joinedSince: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const SESSION_TOKEN = jwt.sign(
      {
        userId: user._id,
        avatar: user.avatar,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        gender: user.gender,
        joinedSince: user.createdAt,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("SESSION_TOKEN", SESSION_TOKEN, {
      httpOnly: true,
      secure: true,
      sameSite: "None", // allows cross-site cookies
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        userId: user._id,
        avatar: user.avatar,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        gender: user.gender,
        joinedSince: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logoutController = async (req, res) => {
  try {
    res.clearCookie("SESSION_TOKEN", SESSION_TOKEN, {
      httpOnly: true,
      secure: true,
      sameSite: "None", // allows cross-site cookies
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { loginController, registerController, logoutController };
