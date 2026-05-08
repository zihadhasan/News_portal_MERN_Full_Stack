import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const [topNews, setTopNews] = useState([]);
  const [politics, setPolitics] = useState([]);
  const [sports, setSports] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [business, setBusiness] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const [top, pol, spo, tech, bus] = await Promise.all([
        api.get("/news/top"),
        api.get("/news?category=Politics"),
        api.get("/news?category=Sports"),
        api.get("/news?category=Technology"),
        api.get("/news?category=Business"),
      ]);

      setTopNews(top.data);
      setPolitics(pol.data);
      setSports(spo.data);
      setTechnology(tech.data);
      setBusiness(bus.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getImage = (img) => {
    if (!img) return "https://via.placeholder.com/400x200";
    if (img.startsWith("http")) return img;
    return `http://localhost:5000${img}`;
  };

  // UPDATED CARD WITH ANIMATION
  const Card = ({ item }) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="card bg-base-100 shadow-md hover:shadow-xl transition h-full overflow-hidden"
    >
      {/* IMAGE */}
      <div className="overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
          src={getImage(item.image)}
          alt={item.title}
          className="w-full h-40 object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="card-body p-4 flex flex-col">
        <h2 className="font-semibold text-md line-clamp-2">
          {item.title}
        </h2>

        <p className="text-sm text-gray-500 line-clamp-3 mt-2">
          {item.content}
        </p>

        <Link
          to={`/news/${item._id}`}
          state={{ from: "/" }}
          className="btn btn-primary text-white btn-xs mt-auto w-fit"
        >
          Read More
        </Link>
      </div>
    </motion.div>
  );

  const Section = ({ title, data }) => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {data.map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">

      {/* HERO (unchanged) */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero bg-blue-600 text-white rounded-xl p-12 shadow-lg"
      >
        <div className="hero-content text-center w-full">
          <div className="max-w-2xl">

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl font-bold"
            >
              Welcome To Our News Portal
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-4 text-lg text-blue-100"
            >
              Stay informed with the latest headlines from around the world.
              We bring you real-time updates on politics, sports, technology, business, and more —
              all in one place.
            </motion.p>

          </div>
        </div>
      </motion.div>

      {/* TOP NEWS */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold"> Top News</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {topNews.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* SECTIONS */}
      <Section title="🏛 Politics" data={politics} />
      <Section title="⚽ Sports" data={sports} />
      <Section title="💻 Technology" data={technology} />
      <Section title="💼 Business" data={business} />

    </div>
  );
}