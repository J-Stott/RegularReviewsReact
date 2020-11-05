import React from "react";
import Button from "../../FormElements/Button";
import { conditionalRender } from "../../../Utility/RenderUtilities";

import classes from "./ManagementButtons.module.css";

const ManagementButtons = (props) => {
  return (
    <div className={classes["buttons-container"]}>
      {conditionalRender(
        <Button link={props.editLink}>Edit</Button>,
        !!props.editLink
      )}
      {conditionalRender(
        <Button danger onClick={props.deleteClick}>
          Delete
        </Button>,
        !!props.deleteClick 
      )}
    </div>
  );
};

export default ManagementButtons;
