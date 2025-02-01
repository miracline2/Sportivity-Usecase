import axios from "axios";

const CommonApiClient = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_API_BASE_UR,
  headers: {
    "Content-Type": "application/json",
  },
});

export default CommonApiClient;
