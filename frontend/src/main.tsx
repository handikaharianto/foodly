import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";

import App from "./App.tsx";
import { store } from "./app/store.ts";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <Notifications position="top-center" zIndex={9999} />
        <Provider store={store}>
          <App />
        </Provider>
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
);
