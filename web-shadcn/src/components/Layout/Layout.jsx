import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { observer } from "mobx-react-lite";
import authModel from "../../models/AuthModel";

export const Layout = observer(() => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!authModel.token) navigate("/")
  }, [authModel.token]);

  return (
    <div className="container flex flex-1 flex-col mx-auto min-h-screen max-h-screen overflow-hidden ">
      <Navbar />
      <main className="container px-10 pt-5 flex flex-1 flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
});
