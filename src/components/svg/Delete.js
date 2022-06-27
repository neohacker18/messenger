import React from "react";

const Delete = ({deleteImage}) => {
  return (
    <div>
      <svg
      onClick={deleteImage}
        xmlns="http://www.w3.org/2000/svg"
        style={{width: "25px", height: "25px", cursor: "pointer"}}
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
        />
      </svg>
    </div>
  );
};

export default Delete;
