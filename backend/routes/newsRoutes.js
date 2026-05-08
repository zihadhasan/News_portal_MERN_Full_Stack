import express from "express";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";
import { getMyNews } from "../controllers/newsController.js";


import {
  getNews,
  getTopNews,
  getSingleNews,
  createNews,
  updateNews,
  deleteNews
} from "../controllers/newsController.js";

const router = express.Router();

router.get("/", getNews);
router.get("/top", getTopNews);


router.get("/my", protect, getMyNews);

router.get("/:id", getSingleNews);

router.post("/", protect, upload.single("image"), createNews);
router.put("/:id", protect, updateNews);
router.delete("/:id", protect, deleteNews);

export default router;