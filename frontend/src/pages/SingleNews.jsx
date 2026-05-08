import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function SingleNews() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FIX: dynamic back route
  const from = location.state?.from || "/news";

  useEffect(() => {
    const fetchSingleNews = async () => {
      try {
        const res = await api.get(`/news/${id}`);
        setNews(res.data);
      } catch (error) {
        console.log("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleNews();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold">News not found</h2>
        <button
          onClick={() => navigate("/")}
          className="btn btn-primary mt-4"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const imageUrl =
    news.image?.startsWith("http")
      ? news.image
      : `http://localhost:5000${news.image}`;

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/*BACK BUTTON */}
      <button
        onClick={() => navigate(from)}
        className="btn btn-outline btn-sm mb-4"
      >
        ← Back
      </button>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">

          <h1 className="text-3xl font-bold">{news.title}</h1>

          <div className="divider"></div>

          {news.image && (
            <img
              src={imageUrl}
              alt="news"
              className="rounded-lg mb-4 w-full object-cover"
            />
          )}

          <p className="text-lg leading-relaxed text-base-content whitespace-pre-line">
            {news.content}
          </p>

          <div className="mt-6 text-sm text-gray-500">
            Category: {news.category} <br />
            Published: {new Date(news.createdAt).toLocaleDateString()}
          </div>

        </div>
      </div>
    </div>
  );
}