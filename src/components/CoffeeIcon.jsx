import React from 'react';

function CoffeeIcon({ width = 32, height = 32, fill = "#000000", strokeColor = "#FFFFFF" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 256 256"
    >
      <rect width="48" height="48" fill="none"></rect>
      <path
        d="M83.3,216A88,88,0,0,1,32,136V88H208v48a88,88,0,0,1-51.3,80Z"
        opacity="0.2"
      ></path>
      <line
        x1="88"
        y1="24"
        x2="88"
        y2="56"
        fill="none"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <line
        x1="120"
        y1="24"
        x2="120"
        y2="56"
        fill="none"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <line
        x1="152"
        y1="24"
        x2="152"
        y2="56"
        fill="none"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <line
        x1="32"
        y1="216"
        x2="208"
        y2="216"
        fill="none"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <path
        d="M83.3,216A88,88,0,0,1,32,136V88H208v48a88,88,0,0,1-51.3,80"
        fill="none"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></path>
      <path
        d="M208,88h0a32,32,0,0,1,32,32v8a32,32,0,0,1-32,32h-3.4"
        fill="none"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></path>
    </svg>
  );
}

export default CoffeeIcon;
