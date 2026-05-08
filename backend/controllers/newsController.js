import News from "../models/News.js";


  // GET ALL NEWS (WITH CATEGORY FILTER)
export const getNews = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};

    const news = await News.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


 
   //TOP NEWS (LATEST 6)
 
export const getTopNews = async (req, res) => {
  try {
    const news = await News.find()
      .sort({ createdAt: -1 })
      .limit(6);

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



   //SINGLE NEWS

export const getSingleNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate("user");

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyNews = async (req, res) => {
  try {
    const news = await News.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

  // CREATE NEWS

export const createNews = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const news = await News.create({
      title,
      content,
      category,
      image,
      user: req.user.id,
    });

    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



   //UPDATE NEWS (OWNER ONLY)

export const updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    // 🔐 ownership check
    if (news.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



   //DELETE NEWS (OWNER ONLY)

export const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    if (news.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await news.deleteOne();

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};