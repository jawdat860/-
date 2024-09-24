import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Import css files
import { AppRoot } from '@telegram-apps/telegram-ui';
import '@telegram-apps/telegram-ui/dist/styles.css';
ReactDOM.createRoot(document.getElementById("root")).render(
  <AppRoot>
    <App />
    </AppRoot>
);
