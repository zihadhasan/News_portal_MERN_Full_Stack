import express from "express";
import {
  register,
  login,
  updateProfile,
  getProfile,   // ✅ MUST be here
  logout        // if using logout
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

router.post("/logout", logout); 

export default router;