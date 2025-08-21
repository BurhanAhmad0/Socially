import express from "express";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware.js";
import { getNotifications } from "../Controllers/NotificationControllers.js";

const router = express.Router();

router.get("/", AuthMiddleware, getNotifications);

export default router;
