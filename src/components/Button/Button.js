import React from "react";
import "./Button.css";

const Button = ({ label, onClick, primary }) => {
  return (
    <button
      className={"button-container" + " " + (primary ? "primary" : "")}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
