import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import News from "./pages/News";
import SingleNews from "./pages/SingleNews";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateNews from "./pages/CreateNews";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile"; //

function App() {
  return (
    <BrowserRouter>

      <Header />

      <main className="min-h-screen">

        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<SingleNews />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />

          {/* 🔒 PROTECTED ROUTES */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ✅ PROFILE ROUTE (ADD HERE) */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-news"
            element={
              <ProtectedRoute>
                <CreateNews />
              </ProtectedRoute>
            }
          />

        </Routes>

      </main>

      <Footer />

    </BrowserRouter>
  );
}

export default App;