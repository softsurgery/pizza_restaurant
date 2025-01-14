import _axios from "axios";
import authModel from "../models/AuthModel";

const baseURL = process.env.REACT_APP_API_URL;

const axios = _axios.create({
  baseURL,
  withCredentials: true, // Ensures cookies and credentials are sent with requests
});

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    config.headers["Cookie"] = `auth_token=${authModel.token}`;
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
