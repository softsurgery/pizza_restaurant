import Layout from "./components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PizzaMenu } from "./components/PizzaMenu/PizzaMenu";
import CustomOrder from "./pages/CustomOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Add your routes here
      { path: "/menu", element: <PizzaMenu /> },
      { path: "/custom-order", element: <CustomOrder /> },
      { path: "*", element: <div> Not Found</div> },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
