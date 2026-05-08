import { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [userNews, setUserNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // EDIT STATE
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    fetchMyNews();
  }, []);

  const fetchMyNews = async () => {
    try {
      const res = await api.get("/news/my");
      setUserNews(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await api.delete(`/news/${id}`);
      setUserNews(userNews.filter((n) => n._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  // OPEN EDIT MODAL
  const openEdit = (news) => {
    setEditItem(news);
    setForm({
      title: news.title,
      content: news.content,
    });

    document.getElementById("edit_modal").showModal();
  };

  // UPDATE
  const handleUpdate = async () => {
    try {
      await api.put(`/news/${editItem._id}`, form);

      document.getElementById("edit_modal").close();
      setEditItem(null);

      fetchMyNews();
    } catch (err) {
      alert("Update failed");
    }
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
          type: "spring",
          stiffness: 120,
        }}
        whileHover={{
          scale: 1.05,
          textShadow: "0px 0px 8px rgba(59,130,246,0.6)",
        }}
        className="text-3xl font-bold text-center cursor-pointer transition"
      >
        My News Dashboard
      </motion.h1>

      {/* EMPTY STATE OR GRID */}
      {userNews.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center mt-20 text-center"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-gray-500"
          >
            Your Dashboard is empty
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 mt-2"
          >
            Publish News to Edit or Delete your posts
          </motion.p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

          {userNews.map((news) => (
            <div key={news._id} className="card bg-base-200 shadow-md">

              {/* IMAGE */}
              {news.image && (
                <figure className="h-40 overflow-hidden">
                  <img
                    src={`http://localhost:5000${news.image}`}
                    className="w-full h-full object-cover"
                    alt="news"
                  />
                </figure>
              )}

              <div className="card-body">

                <h2 className="text-lg font-bold">
                  {news.title}
                </h2>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {news.content}
                </p>

                <div className="flex gap-2 mt-3">

                  <button
                    onClick={() => openEdit(news)}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(news._id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}

      {/* EDIT MODAL */}
      <dialog id="edit_modal" className="modal">

        <div className="modal-box">

          <h3 className="font-bold text-lg mb-3">
            Edit News
          </h3>

          <input
            className="input input-bordered w-full mb-3"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            placeholder="Edit Title..."
          />

          <textarea
            className="textarea textarea-bordered w-full mb-3 h-40 resize-none"
            value={form.content}
            onChange={(e) =>
              setForm({ ...form, content: e.target.value })
            }
            placeholder="Edit News..."
          />

          <div className="flex justify-end gap-2">

            <button
              className="btn"
              onClick={() =>
                document.getElementById("edit_modal").close()
              }
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              Save
            </button>

          </div>

        </div>

      </dialog>

    </div>
  );
}