import React, { useEffect, useState } from "react";

const Timer = ({ start }) => {
  const [remainingTime, setRemainingTime] = useState("");
  const [progress, setProgress] = useState(100); // Start with full circle

  
  useEffect(() => {
    const endTime = new Date(start).getTime() + 120000; // 2 minutes from start
    const totalDuration = import.meta.env.VITE_ANSWER_TIMEOUT; // Total duration in milliseconds

    const interval = setInterval(() => {
      const now = Date.now();
      const timeDiff = endTime - now;

      if (timeDiff <= 0) {
        clearInterval(interval);
        setRemainingTime("Time's up!");
        setProgress(0); // Set progress to 0% for empty circle
      } else {
        const minutes = Math.floor(timeDiff / 60000);
        const seconds = ((timeDiff % 60000) / 1000).toFixed(0);
        setRemainingTime(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);

        // Calculate progress as a percentage of time remaining
        const newProgress = Math.floor((timeDiff / totalDuration) * 100);
        setProgress(newProgress);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [start]);

  const svgStyle = {
    width: "90px",
  };

  const circleStyle = {
    stroke: "#1d4ed8", // Progress bar color
    fill: "none", // Transparent fill
    strokeWidth: "10", // Line thickness
  };

  // Circle properties for the SVG
  const radius = 45; // Radius of the circle
  const circumference = radius * 2 * Math.PI;

  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="">
      <svg style={svgStyle} viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          style={{
            ...circleStyle,
            strokeDasharray,
            strokeDashoffset,
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
        <text
          x="50"
          y="55"
          textAnchor="middle"
          fill="#333"
          fontSize="15"
          dy=".3em"
        >
          {remainingTime}
        </text>
      </svg>
    </div>
  );
};

export default Timer;
