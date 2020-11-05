import React from "react";

import classes from "./LegalSection.module.css";

const LegalSection = (props) => {
    return(
        <div className={classes["content"]}>
            <h4>{props.heading}</h4>
            <p>{props.section}</p>
            {props.children}
        </div>
    );
}

export default LegalSection;