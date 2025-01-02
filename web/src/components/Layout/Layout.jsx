import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export default function Layout() {
  return (
    <div className="container flex flex-1 flex-col mx-auto min-h-screen max-h-screen overflow-hidden ">
      <Navbar />
      <main className="container px-10 pt-5 flex flex-1 flex-col overflow-hidden">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
