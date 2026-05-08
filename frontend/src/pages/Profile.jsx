import { useEffect, useState } from "react";
import api from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // toggle states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 🎉 NEW: success state
  const [success, setSuccess] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      setUser(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    if (form.password && form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await api.put("/auth/profile", {
        name: form.name || undefined,
        email: form.email || undefined,
        password: form.password || undefined
      });

      setForm({ name: "", email: "", password: "", confirmPassword: "" });

      // 🎉 success trigger
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);

      fetchProfile();

    } catch (err) {
      alert(err.response?.data || "Update Failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-4 space-y-6"
    >

      {/* 🎉 SUCCESS MESSAGE (added only) */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-base-100 px-6 py-4 rounded-xl shadow-xl text-center"
            >
              <div className="text-green-500 text-4xl">✔</div>
              <p className="font-semibold mt-2">
                Profile Updated Successfully
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TITLE (UNCHANGED) */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        className="text-2xl font-bold text-center"
      >
        👤 USER PROFILE
      </motion.h1>

      {/* INFO CARDS (UNCHANGED) */}
      <div className="grid gap-2">
        {[
          { label: "ID", value: user?._id },
          { label: "Name", value: user?.name },
          { label: "Email", value: user?.email }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="card bg-base-200 shadow-sm"
          >
            <div className="card-body p-3">
              <p className="text-xs font-bold">{item.label}</p>
              <p className="text-sm">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FORM (UNCHANGED STRUCTURE + ONLY INPUT ENHANCEMENT) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-base-100 shadow p-4 rounded-lg space-y-2"
      >

        <h2 className="text-lg font-semibold">
          Update Profile
        </h2>

        {/* NAME */}
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          placeholder="New name"
          className="input input-bordered input-sm w-full"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* EMAIL */}
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="email"
          placeholder="New email"
          className="input input-bordered input-sm w-full"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD + TOGGLE */}
        <div className="relative">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            className="input input-bordered input-sm w-full pr-10"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* CONFIRM PASSWORD + TOGGLE */}
        <div className="relative">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            className="input input-bordered input-sm w-full pr-10"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-3 top-2 text-gray-500"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* BUTTON (UNCHANGED) */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleUpdate}
          className="btn btn-primary btn-sm w-full"
        >
          Update
        </motion.button>

      </motion.div>

    </motion.div>
  );
}