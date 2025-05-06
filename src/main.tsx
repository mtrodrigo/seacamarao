import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider } from "./contexts/CartContext.tsx";
import "./index.css";
import App from "./App.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
  </StrictMode>
);
