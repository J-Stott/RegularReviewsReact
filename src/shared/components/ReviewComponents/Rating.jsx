import React from "react";
import StarRating from "./StarRating"

import classes from "./Rating.module.css";

const Rating = (props) => {
    return(
        <div className={classes["rating-container"]}>
            <h5>{props.label}</h5>
            <StarRating big rating={props.rating} />
        </div>
    );
}

export default Rating;