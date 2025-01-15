import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const FakePaymentLoader = observer(({ redirectAfterSeconds = 5 }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(redirectAfterSeconds);

  useEffect(() => {
    // Countdown timer
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect when countdown reaches 0
    const timeout = setTimeout(() => {
      navigate("/app/menu");
    }, redirectAfterSeconds * 1000);

    // Cleanup timers on component unmount
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate, redirectAfterSeconds]);

  return (
    <div className="flex flex-1 flex-col overflow-auto items-center h-screen py-6">
      <div className="w-full max-w-4xl p-6 bg-gray-800 rounded-lg shadow-md text-center text-white">
        <p className="text-2xl font-bold mb-4">Processing your order...</p>
        <p className="text-lg">
          Redirecting to the menu in{" "}
          <span className="font-mono text-yellow-400">{countdown}</span> seconds.
        </p>
      </div>
    </div>
  );
});

export default FakePaymentLoader;
