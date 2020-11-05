import React from "react";

import classes from "./RatingButton.module.css";

import {addClasses} from "../../Utility/CssUtilities";

const RatingButton = (props) => {

    console.log()
    const styling = +props.userRating === 1 ? "rating" : "no-rating";

    const classNames = addClasses(classes, ["button", styling]);

    const buttonClicked = () => {
        props.onClick(props.id);
    }

    return(
        <button id={props.id} className={classNames} onClick={buttonClicked} disabled={props.disabled}>
            {props.children}
        </button>
    );
}

export default RatingButton;