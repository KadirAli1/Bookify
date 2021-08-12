import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use(
  async (config: any) => {
    if (!config.headers.Authorization) {
    }
    return config;
  },
  (err) => {
    throw new Error("An error ocurred!");
  }
);

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err && err.response) throw new Error(err.response?.data?.message);
    // throw new Error("An error ocurred!");
  }
);

export default http;
