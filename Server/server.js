import express from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./Routes/AuthRoutes.js";
import userRoutes from "./Routes/UserRoutes.js";
import { connectDB } from "./Utils/connectDB.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    methods: ["PUT", "DELETE", "POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded());

// // parse application/json
// app.use(bodyParser.json());

// Connecting Database
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to Socially Server!");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on http://127.0.0.1:${port}`);
});
