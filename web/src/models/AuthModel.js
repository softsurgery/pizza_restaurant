import { action, makeObservable, observable } from "mobx";
import axios from "../api/axios";

class AuthModel {
  user = null;
  loading = false;
  error = null;

  constructor() {
    makeObservable(this, {
      // States
      user: observable,
      loading: observable,
      error: observable,
      // Methods
      signin: action,
      signup: action,
      logout: action,
    });
  }

  // Signin method
  async signin(email, password) {
    this.loading = true;
    this.error = null;
    try {
      const response = await axios.post("/signin", { email, password });
      this.user = response.data;
      localStorage.setItem("auth_token", response.data.token); // Save token if needed
    } catch (error) {
      this.error = error.response?.data?.message || "Signin failed";
    } finally {
      this.loading = false;
    }
  }

  // Signup method
  async signup(data) {
    this.loading = true;
    this.error = null;
    try {
      const response = await axios.post("signup", data);
      this.user = response.data.user;
      localStorage.setItem("auth_token", response.data.token); // Save token if needed
    } catch (error) {
      this.error = error.response?.data?.message || "Signup failed";
    } finally {
      this.loading = false;
    }
  }

  // Logout method
  logout() {
    this.user = null;
    localStorage.removeItem("auth_token");
  }
}

const authModel = new AuthModel();
export default authModel;
