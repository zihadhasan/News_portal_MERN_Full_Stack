import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get("/news");
        setNews(res.data);
      } catch (error) {
        console.log("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto p-6"
    >
      {/* PAGE TITLE */}
      <motion.h1
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }}
            className="text-3xl font-bold mb-8 text-center"
          >
            All Latest News
      </motion.h1>

      {/* NEWS GRID */}
      <div className="grid md:grid-cols-3 gap-8">

        {news.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -8 }}
            className="card bg-base-100 shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
          >

            {/* IMAGE */}
                          {item.image && (
                <div className="overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                    src={`https://news-portal-mern-full-stack.onrender.com${item.image}`}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

            <div className="card-body">

              {/* TITLE */}
              <h2 className="card-title line-clamp-2">
                {item.title}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-500 line-clamp-3">
                {(item.description || item.content)?.slice(0, 120)}...
              </p>

              {/* BUTTON */}
              <div className="card-actions justify-end mt-4">

               <Link
                to={`/news/${item._id}`}
                state={{ from: "/news" }}
                className="btn btn-primary btn-sm"
              >
                Read More
              </Link>
              </div>

            </div>

          </motion.div>
        ))}

      </div>
    </motion.div>
  );
}