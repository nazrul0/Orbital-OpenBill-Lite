import React from "react";

import "./InputField.css";

const Input = (props) => {
  return (
    <div className="input">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        step={props.step}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
      />
    </div>
  );
};

export default Input;
