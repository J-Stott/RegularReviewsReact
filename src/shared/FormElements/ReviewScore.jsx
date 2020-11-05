import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import classes from "./ReviewScore.module.css";

import { useInput } from "../../hooks/input-hook";

const ReviewScore = (props) => {
  const initialValue = props.initialValue || 0;
  const valid = true;

  const [inputState, changeHandler] = useInput(initialValue, valid, []);

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    //passes input data up to formState management
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const inputs = [];

  for (let i = 5; i > 0; i--) {
    inputs.push(
      <React.Fragment key={`${props.id}-star-${i}`}>
        <input
          className={`${classes["star"]}`}
          type="radio"
          value={i}
          name={props.id}
          id={`${props.id}-star-${i}`}
          onChange={changeHandler}
          defaultChecked={i === +initialValue}
        />
        <label
          className={`${classes["star"]}`}
          htmlFor={`${props.id}-star-${i}`}
        >
          <FontAwesomeIcon icon={faStar} />
        </label>
      </React.Fragment>
    );
  }

  return (
    <div className={classes["rating-container"]}>
      <h5>{props.label}</h5>
      <div className={classes["left"]}>{inputs}</div>
    </div>
  );
};

export default ReviewScore;
