import React from "react";

function EventIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      fill="none"
      viewBox="0 0 16 17"
    >
      <rect
        width="12"
        height="10"
        x="2"
        y="4.18"
        stroke="#8D8A95"
        strokeWidth="1.333"
        rx="1.333"
      ></rect>
      <path
        fill="#8D8A95"
        d="M2 6.846c0-1.257 0-1.885.39-2.276.391-.39 1.02-.39 2.277-.39h6.666c1.257 0 1.886 0 2.277.39.39.39.39 1.02.39 2.276H2z"
      ></path>
      <path
        stroke="#8D8A95"
        strokeLinecap="round"
        strokeWidth="1.333"
        d="M4.667 2.18v2M11.333 2.18v2"
      ></path>
    </svg>
  );
}

export default EventIcon;