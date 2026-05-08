import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  // 🔥 PASSWORD STRENGTH
  const getStrength = (password) => {
    let score = 0;

    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2)
      return { label: "Weak", color: "bg-red-500", width: "30%" };
    if (score <= 4)
      return { label: "Medium", color: "bg-yellow-500", width: "60%" };
    return { label: "Strong", color: "bg-green-500", width: "100%" };
  };

  const strength = getStrength(form.password);

  const handleRegister = async () => {
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("❌ Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password
      });

      // 🎉 success animation trigger
      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError(err.response?.data || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Animation configs
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">

      
      {/* BEAUTIFUL SUCCESS OVERLAY */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
          >
            {/* Floating glow background */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.2 }}
              transition={{ duration: 0.8 }}
              className="absolute w-72 h-72 bg-green-400/30 rounded-full blur-3xl"
            />

            {/* Main card */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 12
              }}
              className="bg-white rounded-2xl shadow-2xl p-8 text-center w-80 relative overflow-hidden"
            >
              {/* Animated check circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: 0.1
                }}
                className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-green-100"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.2 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl"
                >
                  ✅
                </motion.span>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-bold mt-4 text-gray-800"
              >
                Registration Successful
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-gray-500 mt-1"
              >
                Creating your account...
              </motion.p>

              {/* Progress bar animation */}
              <motion.div className="w-full h-1 bg-gray-200 mt-5 rounded overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="h-full bg-green-500"
                />
              </motion.div>

              {/* Loading dots */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center gap-1 mt-3"
              >
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card w-96 bg-base-100 shadow-2xl"
      >
        <div className="card-body space-y-4">

          {/* TITLE (YOUR ORIGINAL ANIMATION) */}
          <motion.h2
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 120
            }}
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-center"
          >
            Create An Account
          </motion.h2>

          {/* FORM FIELDS (YOUR ORIGINAL ANIMATION) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >

            {/* NAME */}
            <motion.input
              variants={fieldVariants}
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            {/* EMAIL */}
            <motion.input
              variants={fieldVariants}
              whileFocus={{ scale: 1.02 }}
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            {/* PASSWORD */}
            <motion.div variants={fieldVariants} className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full pr-10"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </motion.div>

            {/* PASSWORD STRENGTH METER */}
            {form.password && (
              <div>
                <div className="w-full h-2 bg-gray-200 rounded">
                  <div
                    className={`h-2 rounded ${strength.color}`}
                    style={{ width: strength.width }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Strength: {strength.label}
                </p>
              </div>
            )}

            {/* CONFIRM PASSWORD */}
            <motion.div variants={fieldVariants} className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="input input-bordered w-full pr-10"
                onChange={(e) =>
                  setForm({
                    ...form,
                    confirmPassword: e.target.value
                  })
                }
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-3 text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </motion.div>

          </motion.div>

          {/* ERROR */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          {/* BUTTON */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleRegister}
            className="btn btn-success w-full"
            disabled={loading}
          >
            {loading ? "Creating..." : "Register"}
          </motion.button>

          {/* LOGIN */}
          <p className="text-sm text-center mt-2">
            Already have an account?{" "}
            <Link className="text-blue-500 hover:underline" to="/login">
              Login
            </Link>
          </p>

        </div>
      </motion.div>
    </div>
  );
}