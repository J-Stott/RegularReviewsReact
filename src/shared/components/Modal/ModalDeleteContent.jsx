import React from "react";
import Button from "../../FormElements/Button";

import classes from "./ModalDeleteContent.module.css";

const ModalDeleteContent = (props) => {
  return (
    <div className={classes["content"]}>
      <div>
        <p className={classes["danger"]}>{props.deleteMessage}</p>
      </div>

      <div className={classes["buttons"]}>
        <Button danger onClick={props.delete}>
          Delete
        </Button>

        <Button onClick={props.close}>Cancel</Button>
      </div>
    </div>
  );
};

export default ModalDeleteContent;
