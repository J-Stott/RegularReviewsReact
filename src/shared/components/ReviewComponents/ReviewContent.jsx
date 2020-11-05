import React from "react";
import classes from "./ReviewContent.module.css";

const ReviewContent = (props) => {

    const heading = props.review ? <h1 className={classes["review-heading"]}>{props.heading}</h1> : <h2 className={classes["review-heading"]}>{props.heading}</h2>;

    let content = props.content;

    if(props.short && content.length > 500) {
        content = content.slice(0, 500) + "...";
    }

    return(
        <div className={classes["content-container"]}>
            {heading}
            <p className={classes["content"]}>{content}</p>
        </div>
    );
}

export default ReviewContent;