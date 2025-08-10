import express from "express";
import {
  loginController,
  registerController,
  logoutController,
} from "../Controllers/AuthControllers.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/logout", logoutController);

export default router;
