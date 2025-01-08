import { action, makeObservable, observable } from "mobx";
import axios from "../api/axios";

class AuthModel {
  //formdata
  username = "";
  email = "";
  password = "";
  //metadata
  user = null;
  loading = false;
  error = null;

  constructor() {
    makeObservable(this, {
      // formdata
      username: observable,
      email: observable,
      password: observable,
      // metadata
      user: observable,
      loading: observable,
      error: observable,
      // Methods
      set: action,
      signin: action,
      signup: action,
      logout: action,
    });
  }

  set(name, value) {
    this[name] = value;
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

  async signup() {
    this.loading = true;
    this.error = null;

    try {
      const response = await axios.post("/signup", {
        username: this.username,
        email: this.email,
        password: this.password,
      });
      console.log("test", response);
      return { message: response.data.message, status: 201 };
    } catch (error) {
      return {
        message: error.response.data.message,
        status: error.response.status,
      };
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
