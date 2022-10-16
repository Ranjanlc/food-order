import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div
      className={classes.input}
      style={{ display: props.label !== "Amount" && "block" }}
    >
      <div>
        <label htmlFor={props.input.id}>{props.label}</label>
      </div>
      <div>
        <input value={props.value} {...props.input} />
      </div>
    </div>
  );
};

export default Input;
