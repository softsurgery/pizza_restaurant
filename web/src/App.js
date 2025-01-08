import { Layout } from "./components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PizzaMenu } from "./components/PizzaMenu/PizzaMenu";
import CustomOrder from "./pages/CustomOrder";
import { Auth } from "./pages/Auth";
import Basket from "./components/Basket/Basket";
import { Toaster } from "react-hot-toast";
import { Account } from "./components/Account/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />, // Default to the Sign-Up Component
  },
  {
    path: "/app",
    element: <Layout />,
    children: [
      { path: "menu", element: <PizzaMenu /> }, // Relative path
      { path: "custom-order", element: <CustomOrder /> }, // Relative path
      { path: "basket", element: <Basket /> }, // Relative path
      { path: "account", element: <Account /> }, // Relative path
      { path: "*", element: <div> Not Found</div> }, // Relative path
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster toastOptions={{ className: "bg-slate-800 text-white" }} />
    </div>
  );
}

export default App;
