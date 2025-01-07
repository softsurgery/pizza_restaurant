import _axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;

const axios = _axios.create({
  baseURL,
  withCredentials: true,
});

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
