import { useState } from "react";
import api from "../api/axios";

export default function CreateNews() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const submit = async () => {
    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("category", form.category);
      formData.append("image", form.image);

      await api.post("/news", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("News Created Successfully");

      setForm({
        title: "",
        content: "",
        category: "",
        image: null,
      });

    } catch (err) {
      alert(err.response?.data || "Error creating news");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-3xl text-center font-bold mb-6">
         Create News
      </h1>

      <div className="space-y-4">

        {/* TITLE */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="News Title"
          className="input input-bordered w-full"
        />

        {/* CONTENT */}
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="News Content"
          className="textarea textarea-bordered w-full"
        />

        {/* CATEGORY */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Category</option>
          <option value="Politics">Politics</option>
          <option value="Sports">Sports</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
        </select>

        {/* IMAGE */}
        <input
          type="file"
          onChange={handleFile}
          className="file-input file-input-bordered w-full"
        />

        {/* BUTTON */}
        <button
          onClick={submit}
          className="btn btn-primary w-full"
        >
          Publish News
        </button>

      </div>
    </div>
  );
}