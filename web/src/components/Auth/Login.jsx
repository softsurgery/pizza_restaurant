import React from "react";
import toast from "react-hot-toast";
import { observer } from "mobx-react-lite";
import authModel from "../../models/AuthModel";
import { useNavigate } from "react-router-dom";

export const Login = observer(() => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    const response = await authModel.login();
    if (response.status === 200) {
      toast.success(response.message);
      navigate('/app/menu')
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div>
      <div className="p-10">
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
              value={authModel.email}
              onChange={(e) => authModel.set("email", e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <label htmlFor="password">Password</label>
              {/* <a
                href="#"
                className="ml-auto text-sm underline-offset-2 hover:underline"
              >
                Forgot your password?
              </a> */}
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
          <button className="w-full btn btn-outline" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
});
