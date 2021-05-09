import React from "react";
import "./Input.css";

const Input = ({ label, value, type, name, onChange }) => {
  return (
    <div className="input-container">
      <label>{label}</label>
      <input
        type={type || "text"}
        value={value}
        onChange={onChange}
        name={name}
      ></input>
    </div>
  );
};

export default Input;
