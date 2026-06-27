import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import CartProvider from "./context/Cartcontext";
import UserProvider from "./context/Usercontext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider> 
        <UserProvider>
            <App />
        </UserProvider>
    </CartProvider>
  </BrowserRouter>
);