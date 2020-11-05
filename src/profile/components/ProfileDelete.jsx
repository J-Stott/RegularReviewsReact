import React from "react";

import classes from "./ProfileDelete.module.css";
import Button from "../../shared/FormElements/Button";

const ProfileDelete = (props) => {
  return (
    <div className={classes["form-div"]}>
      <div className={classes["label"]}>
        <h5>{props.label}</h5>
      </div>
      <div className={classes["inputs"]}>
        <div className={classes["button"]}>
          <Button danger onClick={props.onClick}>
            {props.buttonMessage}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDelete;
