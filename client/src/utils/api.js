import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api", // Use deployed backend URL
  withCredentials: true,
});

export default api;
