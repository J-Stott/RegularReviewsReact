import React from "react";
import classes from "./ContentWrapper.module.css";

const ContentWrapper = (props) => {

    const className = props.hoverable ? "content-wrapper-hoverable" : "content-wrapper";

    return(
        <div className={classes[className]}>
            {props.children}
        </div>
    );
}

export default ContentWrapper;