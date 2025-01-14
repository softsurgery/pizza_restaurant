import { action, makeObservable, observable } from "mobx";
import axios from "../api/axios";
import { makePersistable } from "mobx-persist-store";

class AuthModel {
  //formdata
  username = "";
  email = "";
  password = "";
  //metadata
  user = null;
  token = null;
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
      token: observable,
      loading: observable,
      error: observable,
      // Methods
      set: action,
      signup: action,
      login: action,
      logout: action,
    });
    makePersistable(this, {
      name: "AuthModel",
      properties: ["user", "token", "email"],
      expireIn: 3 * 24 * 60 * 60 * 1000, // Expiration in milliseconds (3 days)
      storage: window.localStorage, // Use localStorage for persistence
    }).catch((error) =>
      console.error("Failed to initialize persistence for AuthModel:", error)
    );
  }

  set(name, value) {
    this[name] = value;
  }

  // Signin method
  async login() {
    this.loading = true;
    this.error = null;
    try {
      const response = await axios.post("/signin", {
        email: this.email,
        password: this.password,
      });
      this.token = response.data.token;
      this.user = JSON.parse(atob(response.data.token.split(".")[1]));
      this.email = this.user.email;
      this.username = this.user.username;
      return {
        message: "Welcome! We are delighted to have you here.",
        status: 200,
      };
    } catch (error) {
      return {
        message: error.response.data.message,
        status: error.response.status,
      };
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
      return {
        message: response.data.message + ", Now You Can Login",
        status: 201,
      };
    } catch (error) {
      return {
        message: error.response.data.message,
        status: error.response.status,
      };
    } finally {
      this.loading = false;
    }
  }

  async updateEmail() {
    this.loading = true;
    this.error = null;

    try {
      const response = await axios.put(`/update-email/${this.user._id}`, { email: this.email });
      this.user = { ...this.user, email: response.data.email, username: response.data.username }
      return {
        message: "Email updated successfully",
        status: 200,
      };
    } catch (error) {
      return {
        message: error.response.data.message,
        status: error.response.status,
      };
    } finally {
      this.loading = false;
    }
  }

  logout() {
    this.token = null;
    this.user = {};
  }
}

const authModel = new AuthModel();
export default authModel;
