import { Layout } from "./components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomOrder from "./pages/CustomOrder";
import { Auth } from "./pages/Auth";
import Basket from "./components/Basket/Basket";
import { Toaster } from "react-hot-toast";
import Menu from "./pages/Menu";
import FakePaymentLoader from "./components/Checkout/Loader";
import Account from "./pages/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />, // Default to the Sign-Up Component
  },
  {
    path: "/app",
    element: <Layout />,
    children: [
      { path: "menu", element: <Menu /> }, // Relative path
      { path: "custom-order", element: <CustomOrder /> }, // Relative path
      { path: "basket", element: <Basket /> }, // Relative path
      { path: "account", element: <Account /> }, // Relative path
      { path: "payment-is-confirming", element: <FakePaymentLoader /> }, // Relative path
      { path: "*", element: <div> Not Found</div> }, // Relative path
    ],
  },
  { path: "*", element: <div> Not Found</div> }, // Relative path
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" toastOptions={{ className: "bg-slate-800 text-white" }} />
    </div>
  );
}

export default App;
