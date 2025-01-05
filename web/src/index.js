import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./PizzaBuilderStyles.css";
import { UserProvider} from "./Context/User/UserContext"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
