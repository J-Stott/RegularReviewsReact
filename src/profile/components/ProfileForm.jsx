import React from "react";

import classes from "./ProfileForm.module.css";

import Input from "../../shared/FormElements/Input";
import TextArea from "../../shared/FormElements/TextArea";
import Button from "../../shared/FormElements/Button";

import { conditionalRender } from "../../Utility/RenderUtilities";

const ProfileForm = (props) => {
  let input = null;

  switch (props.type) {
    case "input":
      input = (
        <Input
          id={props.id}
          name={props.id}
          type={props.inputType}
          placeholder={props.placeholder}
          errorMessage={props.errorMessage}
          validators={props.validators}
          initialValue={props.initialValue || ""}
          valid={!!props.initialValue}
          onInput={props.inputHandler}
        />
      );
      break;
    case "textarea":
      input = (
        <TextArea
          id={props.id}
          name={props.id}
          placeholder={props.placeholder}
          onInput={props.inputHandler}
          initialValue={props.initialValue || ""}
          valid={!!props.initialValue}
          validators={props.validators}
          rows="3"
        />
      );
      break;
      default:
        input = null
  }

  return (
    <div className={classes["form-div"]}>
      <div className={classes["label"]}>
        <h5>{props.label}</h5>
      </div>
      <div className={classes["inputs"]}>
        {input}
        {conditionalRender(
          <div className={classes["button"]}>
            <Button type="submit" disabled={props.disabled}>{props.buttonMessage}</Button>
          </div>,
          !!props.buttonMessage
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
