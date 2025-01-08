import React, { useState } from "react";
import Login from "../components/Auth/Login";
import { SignUp } from "../components/Auth/SignUp";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="flex flex-col gap-6">
        <div className="card overflow-hidden bg-slate-900/50">
          <div className="grid p-0 md:grid-cols-2 card-body">
            <div className="relative hidden bg-muted md:block">
              <img
                src="https://ae01.alicdn.com/kf/HTB1zN1mXiHrK1Rjy0Flq6AsaFXa3.jpg"
                alt="pizza-restaurant"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="h-[600px] w-[350px]">
              {isLogin ? (
                <Login />
              ) : (
                <SignUp
                  switchToLogin={() => {
                    setIsLogin(true);
                  }}
                />
              )}
              <div className="text-center">
                <p>
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </p>
                <button
                  className="text-primary underline underline-offset-4"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  <span>{isLogin ? "Sign-Up" : "Login"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

export default Auth;
