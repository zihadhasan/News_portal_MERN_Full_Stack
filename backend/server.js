import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "News Portal API is running",
  });
});

export default app;