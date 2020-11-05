import React, { useEffect } from "react";
import classes from "./Input.module.css";

import { conditionalRender } from "../../Utility/RenderUtilities";
import { useInput } from "../../hooks/input-hook";

//will handle a majority of text based input types

const Input = (props) => {
  const initialValue = props.initialValue || "";
  const valid = props.valid || false;

  const [inputState, changeHandler, focusHandler, unfocusHandler] = useInput(
    initialValue,
    valid,
    props.validators
  );

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    //passes input data up to formState management
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const invalid =
    !inputState.isValid && inputState.isModified && !inputState.isFocused;

  return (
    <div
      className={`${classes["form-control"]} ${
        invalid && classes["form-control__invalid"]
      }`}
    >
      {conditionalRender(
        <label htmlFor={props.id}>{props.label}</label>,
        props.label
      )}
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onFocus={focusHandler}
        onBlur={unfocusHandler}
        value={value}
        autoComplete={props.autoComplete || "on"}
        disabled={props.disabled}
      />
      {conditionalRender(<p>{props.errorMessage}</p>, invalid)}
    </div>
  );
};

export default Input;
