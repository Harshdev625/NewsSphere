import React from "react";

const Alert = ({ message, onClose }) => {
  return (
    <div className="alert-message">
      <p>{message}</p>
      <button onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default Alert;
