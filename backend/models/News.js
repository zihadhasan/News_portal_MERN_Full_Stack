import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    image: String,
    category: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const News = mongoose.model("News", newsSchema);

export default News;