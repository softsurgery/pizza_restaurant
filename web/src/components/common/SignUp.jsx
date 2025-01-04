import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        name: username,
        email,
        password,
      });
      if (response.status === 201) {
        toast.success("Account created successfully!");
        setTimeout(() => {
          navigate("/layout/menu");
        }, 1000);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Failed to create an account. Please try again.");
    }
  };

  return (
    <div>
      <form className="p-6" onSubmit={handleSignUp}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Sign-Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your info to create an account
            </p>
          </div>
          <div className="grid gap-2">
            <label htmlFor="username">Username</label>
            <input
              className="input input-bordered w-full"
              id="username"
              placeholder="jhon"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
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
            Create an Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
