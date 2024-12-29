import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="container mx-auto min-h-screen max-h-screen ">
      <Navbar />
      <main className="container px-10 py-5">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
