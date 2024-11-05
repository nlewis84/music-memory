import React from "react";

function RefreshIcon({ width = 32, height = 32, fill = "#ffffff" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="192"
      height="192"
      fill="#ffffff"
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none"></rect>
      <polyline
        points="176.2 99.7 224.2 99.7 224.2 51.7"
        fill="none"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      ></polyline>
      <path
        d="M65.8,65.8a87.9,87.9,0,0,1,124.4,0l34,33.9"
        fill="none"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      ></path>
      <polyline
        points="79.8 156.3 31.8 156.3 31.8 204.3"
        fill="none"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      ></polyline>
      <path
        d="M190.2,190.2a87.9,87.9,0,0,1-124.4,0l-34-33.9"
        fill="none"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      ></path>
    </svg>
  );
}

export default RefreshIcon;
