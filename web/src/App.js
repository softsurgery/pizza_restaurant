import Layout from "./components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PizzaMenu from "./components/PizzaMenu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Add your routes here
      { path: "/menu", element: <PizzaMenu/> },
      { path: "/test2", element: <div> Test 2 </div> },
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
