import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/app.scss";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { Toaster } from "sonner";
import { routes } from "./routes/routes";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster position="bottom-center" richColors />
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
