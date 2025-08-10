import jwt from "jsonwebtoken";

export const AuthMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.SESSION_TOKEN;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // You can access req.user in subsequent handlers
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
