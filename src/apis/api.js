import axios from "axios";

export const api = axios.create({
  // Base Backend -> .env
  baseURL: import.meta.env.VITE_PRODUCTION_ENV
    ? import.meta.env.VITE_BACKEND_BASE
    : "http://localhost:5000",
});
