import React, { useEffect } from "react";
import classes from "./Input.module.css";

import { conditionalRender } from "../../Utility/RenderUtilities";

import { useInput } from "../../hooks/input-hook";

const TextArea = React.forwardRef((props, textRef) => {
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
      <textarea
        id={props.id}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={unfocusHandler}
        onFocus={focusHandler}
        value={value}
        rows={props.rows}
        ref={textRef}
      ></textarea>
      {conditionalRender(<p>{props.errorMessage}</p>, invalid)}
    </div>
  );
});

export default TextArea;
