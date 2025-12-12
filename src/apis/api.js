import axios from "axios";
import { baseUrlHandler } from "../utils/baseUrlHandler";

export const api = axios.create({
  // Base Backend -> .env
  baseURL: baseUrlHandler(),
});
