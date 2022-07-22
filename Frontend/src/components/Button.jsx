import React from "react";
import "./Button.css";

function Button(props) {
  return (
    <div>
      <button
        className={`customButton ${props.className}`}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </div>
  );
}

export default Button;
