import React from "react";

import classes from "./MessageDisplay.module.css";

const MessageDisplay = (props) => {

    let displayClass = classes["neutral"];

    if(props.type === "success"){
        displayClass = classes["success"];
    } else if(props.type === "failure") {
        displayClass = classes["failure"];
    }

    return(
        <div className={classes["container"]}>
            <p className={displayClass}>{props.children}</p>
        </div>
    );
}

export default MessageDisplay;