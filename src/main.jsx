import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { LobbiesProvider } from "./context/LobbiesContext.jsx";
import { WebSocketProvider } from "./context/WebSocketContext.jsx";
import { PlayersProvider } from "./context/PlayersContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LobbiesProvider>
    <PlayersProvider>
      <WebSocketProvider>
        <App />
      </WebSocketProvider>
    </PlayersProvider>
  </LobbiesProvider>
);
