import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { ProductProvider } from "./Context/ProductContext.jsx";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthProvider>
    <ProductProvider>
      <App />
    </ProductProvider>
  </AuthProvider>
  // </React.StrictMode>,
);
