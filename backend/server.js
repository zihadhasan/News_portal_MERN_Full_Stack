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

const PORT = process.env.PORT || 5000;

// =======================
// DATABASE
// =======================
connectDB();

// =======================
// CORS
// =======================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without origin (Postman, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// =======================
// MIDDLEWARE
// =======================
app.use(express.json());
app.use(cookieParser());

// =======================
// STATIC FILES
// =======================
app.use("/uploads", express.static("uploads"));

// =======================
// ROUTES
// =======================
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/contact", contactRoutes);

// =======================
// TEST ROUTE
// =======================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "News Portal API is running",
  });
});

// =======================
// SERVER
// =======================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});