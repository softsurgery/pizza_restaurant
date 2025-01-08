import React from "react";
import toast from "react-hot-toast";
import { observer } from "mobx-react-lite";
import authModel from "../../models/AuthModel";

export const SignUp = observer(({ switchToLogin }) => {
  
  const handleSignUp = async () => {
    const response = await authModel.signup();
    if (response.status === 201) {
      toast.success(response.message);
      authModel.set("password", "");
      switchToLogin();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div>
      <div className="p-10">
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
              value={authModel.username}
              onChange={(e) => authModel.set("username", e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              className="input input-bordered w-full"
              id="email"
              type="email"
              placeholder="jhon@example.com"
              value={authModel.email}
              onChange={(e) => authModel.set("email", e.target.value)}
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
              value={authModel.password}
              onChange={(e) => authModel.set("password", e.target.value)}
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
