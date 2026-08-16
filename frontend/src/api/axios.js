import axios from "axios";

const api = axios.create({
  baseURL: "https://news-portal-mern-full-stack.onrender.com/api",
  withCredentials: true,
});

export default api;