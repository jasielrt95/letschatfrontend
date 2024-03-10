import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import notificationSound from "../assets/notification.mp3";

const NotifiableCard = ({ title, body, duration = 20000, onRemove }) => {
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef(new Audio(notificationSound));

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), duration);

    audioRef.current
      .play()
      .catch((error) =>
        console.error("There was an error playing the sound:", error)
      );

    return () => {
      clearTimeout(timer);
      console.log("Notification unmounted");
    };
  }, [duration]);

  useEffect(() => {
    if (!isVisible) {
      const removeTimer = setTimeout(onRemove, 1000);
      return () => clearTimeout(removeTimer);
    }
  }, [isVisible, onRemove]);

  return (
    isVisible && (
      <div className="relative max-w-md m-4 mx-auto bg-white rounded-xl shadow-md md:max-w-2xl transition-opacity duration-1000 opacity-100">
        <div className="absolute -right-0.5 -top-0.5 bg-red-500 rounded-full h-3 w-3 z-10"></div>
        <Card title={title} body={body} />
      </div>
    )
  );
};

export default NotifiableCard;
