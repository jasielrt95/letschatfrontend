import React, { useEffect, useCallback, useRef, useState } from "react";
import { useWebSocket } from "../context/WebSocketContext";
import NotifiableCard from "../components/NotifiableCard";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const notificationIdCounter = useRef(0);
  const { registerMessageHandler, unregisterMessageHandler } = useWebSocket();

  const getUniqueNotificationId = () => {
    notificationIdCounter.current += 1;
    return notificationIdCounter.current;
  };

  const removeNotification = useCallback((notificationIdToRemove) => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter(
        (notification) => notification.id !== notificationIdToRemove
      )
    );
  }, []);

  // Notification Handlers
  const handlePlayerJoined = (message) => {
    setNotifications((prev) => [
      ...prev,
      {
        id: getUniqueNotificationId(),
        title: "Player Joined",
        body: `${message.data.player} joined the lobby!`,
      },
    ]);
  };

  const handlePlayerAnswered = (message) => {
    const notificationBody =
      message.data.remaining === 0
        ? "All players have answered!"
        : `${message.data.remaining} answers left!`;

    setNotifications((prev) => [
      ...prev,
      {
        id: getUniqueNotificationId(),
        title: `${message.data.player} answered the question!`,
        body: notificationBody,
      },
    ]);
  };

  const handleGameStarted = (message) => {
    navigate("playing");
  };

  useEffect(() => {
    registerMessageHandler("joined lobby", handlePlayerJoined);
    registerMessageHandler("new answer", handlePlayerAnswered);
    registerMessageHandler("game started", handleGameStarted);

    return () => {
      unregisterMessageHandler("joined lobby");
    };
  }, [setNotifications, registerMessageHandler, unregisterMessageHandler]);

  return (
    <div className="fixed top-5 right-5 z-50">
      {notifications.map((notification) => (
        <NotifiableCard
          key={notification.id}
          title={notification.title}
          body={notification.body}
          onRemove={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};

export default Notifications;
