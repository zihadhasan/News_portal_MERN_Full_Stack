import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// PASSWORD VALIDATION FUNCTION
const isStrongPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ CHECK DUPLICATE EMAIL
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json("Email already exists");
    }

    // 2️⃣ CHECK DUPLICATE NAME
    const nameExists = await User.findOne({ name });
    if (nameExists) {
      return res.status(400).json("Name already exists");
    }

    // 3️⃣ PASSWORD STRENGTH CHECK
    if (!isStrongPassword(password)) {
      return res.status(400).json(
        "Password must be 8+ chars with uppercase, lowercase, number & special character"
      );
    }

    // 4️⃣ HASH PASSWORD
    const hash = await bcrypt.hash(password, 10);

    // 5️⃣ CREATE USER
    const user = await User.create({
      name,
      email,
      password: hash
    });

    console.log("User Registered:", email);

    // 6️⃣ CLEAN RESPONSE
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server error");
  }
};

// LOGIN (COOKIE + JWT)
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json("Invalid credentials");

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) return res.status(400).json("Invalid credentials");

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    //  COOKIE SET
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    console.log("Login Successful:", user.email);

    res.json({
      message: "Login successful",
      token, // 
       user: {
              _id: user._id,
               name: user.name,
               email: user.email
             }
     });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server error");
  }
};

// PROFILE UPDATE

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json("User not found");

    // UPDATE BASIC INFO
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // 🔥 PASSWORD UPDATE FIX (THIS WAS MISSING)
    if (req.body.password) {
      const isSamePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      // optional: prevent reusing same password
      if (!isSamePassword) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }
    }

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email
    });

  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
};
export const getProfile = async (req, res) => {
  try {
    console.log("REQ USER:", req.user); // 🔥 MUST SHOW ID

    const user = await User.findById(req.user.id).select("-password");

    console.log("USER FROM DB:", user); // 🔥 CHECK DB RESULT

    if (!user) return res.status(404).json("User not found");

    res.json(user);

  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
};

// LOGOUT
export const logout = (req, res) => {
  res.clearCookie("token");

  console.log(" User Logged Out");

  res.json({ message: "Logged out successfully" });
};