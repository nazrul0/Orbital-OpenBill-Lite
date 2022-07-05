import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { AuthContextProvider } from "./context/authcontext.js";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
  // </React.StrictMode>
);
