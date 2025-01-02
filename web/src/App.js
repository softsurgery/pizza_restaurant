import Layout from "./components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PizzaMenu } from "./components/PizzaMenu/PizzaMenu";
import CustomOrder from "./pages/CustomOrder";
import Auth from "./components/common/Auth";
import Basket from "./components/Basket/Basket";
import { Toaster } from "react-hot-toast";
import Account from "./components/Account/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Add your routes here
      { path: "/menu", element: <PizzaMenu /> },
      { path: "/custom-order", element: <CustomOrder /> },
      { path: "*", element: <div> Not Found</div> },
      { path: "/basket", element: <Basket /> },
      { path: "/account", element: <Account /> },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
