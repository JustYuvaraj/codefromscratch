import axios from "axios";

const api = axios.create({
  baseURL: "/api", // ✅ match your backend URL
  withCredentials: true,
});

export default api;
