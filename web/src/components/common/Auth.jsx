import React, { useState } from "react";
import { cn } from "../../lib/tailwind";
import Login from "./Login";
import SignUp from "./SignUp";

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
            <div>
              {isLogin ? <Login /> : <SignUp />}
              <div className="text-center m-4">
                {isLogin ? (
                  <p>
                    Don&apos;t have an account?{" "}
                    <button
                      className="text-primary underline underline-offset-4"
                      onClick={() => setIsLogin(false)}
                    >
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button
                      className="text-primary underline underline-offset-4"
                      onClick={() => setIsLogin(true)}
                    >
                      Login
                    </button>
                  </p>
                )}
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
