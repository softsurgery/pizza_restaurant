import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { observer } from "mobx-react-lite";
import authModel from "../../models/AuthModel";

export const SignUp = observer(() => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const response = await authModel.signup(username, email, password);
    console.log(response);
    if (response.status === 201) {
      toast.success(response.message);
      setTimeout(() => {
        navigate("/app/menu");
      }, 1000);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div>
      <div className="p-6">
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
          <button className="w-full btn btn-outline" onClick={handleSignUp}>
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
});
