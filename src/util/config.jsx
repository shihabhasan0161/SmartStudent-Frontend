import axios from "axios";

const config = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// list of endpoints to skip auth header
const skipAuthEndpoints = ["login", "register", "status", "activate"];

// Add a request interceptor
config.interceptors.request.use(
  (request) => {
    const skipAuth = skipAuthEndpoints.some((endpoint) => {
      request.url?.includes(endpoint);
    });
    if (!skipAuth) {
      const token = localStorage.getItem("token");
      if (token) {
        request.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return request;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
config.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized! Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/signin";
      } else if (error.response.status === 500) {
        console.error("Server error! Please try again later.");
      }
    }
    return Promise.reject(error);
  }
);

export { config };
export default config;
