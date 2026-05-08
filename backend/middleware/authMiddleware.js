
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log("❌ No token in cookie");
    return res.status(401).json("Not authorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; 

    next();
  } catch (err) {
    console.log("❌ JWT ERROR:", err.message);
    res.status(401).json("Invalid token");
  }
};