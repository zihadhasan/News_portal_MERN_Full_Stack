import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
export default function Header() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const btnStyle =
    "btn btn-sm bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 transition";

  return (
    <div className="navbar bg-base-100 shadow-md px-6 sticky top-0 z-50">

      {/* LEFT */}
      <div className="flex-1">
        <Link to="/" className={`${btnStyle} font-bold`}>
          News Portal
        </Link>
      </div>

      {/* CENTER */}
      <div className="hidden md:flex items-center gap-3 mx-2">
        <Link className={btnStyle} to="/">Home</Link>
        <Link className={btnStyle} to="/news">News</Link>
        <Link className={btnStyle} to="/contact">Contact</Link>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 ml-auto">

        {!isLoggedIn ? (
          <>
            <Link to="/login" className={btnStyle}>
              Login
            </Link>

            <Link to="/register" className={btnStyle}>
              Register
            </Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
             <label tabIndex={0} className="btn btn-ghost btn-sm">
                  👤 {userName} ▼
                </label>

            <AnimatePresence>

                  {/* DaisyUI uses focus-based dropdown, so we simulate animation */}
                  <motion.ul
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44 mt-2 origin-top"
                  >
                    <motion.li whileHover={{ x: 4 }}>
                      <Link to="/dashboard"
                       className="block w-full px-3 py-2 rounded hover:bg-blue-500 hover:text-white transition">
                        Dashboard</Link>
                    </motion.li>

                    <motion.li whileHover={{ x: 4 }}>
                      <Link to="/create-news"
                       className="block w-full px-3 py-2 rounded hover:bg-blue-500 hover:text-white transition">
                        Create News</Link>
                    </motion.li>

                   <motion.li whileHover={{ x: 4 }}>
                   <Link
                    to="/profile"
                   className="block w-full px-3 py-2 rounded hover:bg-blue-500 hover:text-white transition"
                     >
                     Profile
                    </Link>
                   </motion.li>

                    <div className="divider my-1"></div>

                    <motion.li whileHover={{ scale: 1.03 }}>
                    <button
                        onClick={handleLogout}
                      className="w-full text-left text-green-500 hover:bg-red-600 hover:text-white rounded px-3 py-2 transition"
                        >
                        Logout
                      </button>
                      </motion.li>
                      </motion.ul>
                </AnimatePresence>

          </div>
        )}

        {/* THEME TOGGLE */}
        <ThemeToggle />

      </div>

    </div>
  );
}