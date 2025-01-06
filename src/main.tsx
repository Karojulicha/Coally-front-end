import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { Provider } from "./components/ui/provider.tsx";
import { AuthProvider } from "../auth/AuthProvider.tsx";

createRoot(document.getElementById("root")! as HTMLElement).render(
  <StrictMode>
    <Provider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
