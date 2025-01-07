import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser } from "../../Context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/signin", {
        email,
        password,
      });
      if (response.status === 200) {
        const user = response.data; 
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Logged in successfully!");
        setTimeout(() => navigate("/layout/menu"), 1000);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div>
      <form className="p-10" onSubmit={handleLogin}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-balance text-muted-foreground">
              Login to your account
            </p>
          </div>
          <div className="grid gap-2">
            <label htmlFor="email">Email</label>
            <input
              className="input input-bordered w-full"
              id="email"
              type="email"
              placeholder="jhon@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <label htmlFor="password">Password</label>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-2 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <input
              className="input input-bordered w-full max-w-xs"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full btn btn-outline">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
