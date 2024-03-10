import React, { createContext, useContext, useEffect, useRef } from "react";
import { connect, disconnect } from "../utils/websockets";
import { useLobbies } from "../context/LobbiesContext";

const WebSocketContext = createContext();

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
  const { lobbyData } = useLobbies();
  const messageHandlers = useRef(new Map());
  const wsUrl = import.meta.env.VITE_WS_URL;

  const handleMessage = (event) => {
    console.log("Message Received: " + event);
    const message = JSON.parse(event.data);
    const handler = messageHandlers.current.get(message.action);
    if (handler) {
      handler(message);
    } else {
      console.log("Received unhandled message:", message);
    }
  };

  useEffect(() => {
    const url = wsUrl + lobbyData.id + "/";
    if (lobbyData.id !== undefined) {
      connect(
        url,
        handleMessage,
        () => console.log("WebSocket connected"),
        () => console.log("WebSocket disconnected"),
        (error) => console.error("WebSocket error:", error)
      );
    }

    return () => {
      disconnect();
    };
  }, [lobbyData.id]);

  const registerMessageHandler = (type, handler) => {
    console.log("Registering Handler for: " + type);
    messageHandlers.current.set(type, handler);
  };

  const unregisterMessageHandler = (type) => {
    console.log("Unregistering Handler for: " + type);
    messageHandlers.current.delete(type);
  };

  const clearState = () => {
    disconnect();
    messageHandlers.current.clear();
  };

  return (
    <WebSocketContext.Provider
      value={{
        registerMessageHandler,
        unregisterMessageHandler,
        clearState,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
