import express from "express";
import { fetchMessages } from "../Controllers/MessageControllers.js";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/:id", AuthMiddleware, fetchMessages);

export default router;
