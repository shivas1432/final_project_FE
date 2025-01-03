
import React from 'react';
import '../css/FloatingIcon.css'; 

const FloatingIcon = ({ onClick }) => {
  return (
    <div className="floating-icon" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2a10 10 0 1 1-9.95 9H2a9.98 9.98 0 0 0 0 2h.05A10 10 0 0 1 12 2z" />
        <path d="M12 6a6 6 0 1 0 6 6h-6V6z" />
      </svg>
    </div>
  );
};

export default FloatingIcon;
