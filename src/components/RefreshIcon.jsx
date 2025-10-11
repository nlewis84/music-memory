import React from "react";

// Standard Phosphor ArrowClockwise icon
function RefreshIcon({ width = 32, height = 32, fill = "#ffffff" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none"></rect>
      <polyline
        points="176 96 224 96 224 48"
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="20"
      ></polyline>
      <path
        d="M190.2,190.2a88,88,0,1,1,0-124.4l33.8,34.2"
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="20"
      ></path>
    </svg>
  );
}

export default RefreshIcon;
