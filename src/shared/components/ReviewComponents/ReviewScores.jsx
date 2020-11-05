import React from "react";
import Rating from "./Rating";

import classes from "./ReviewScores.module.css";


const ReviewScores = (props) => {
    return(
        <div>
            <h3>Ratings</h3>
            <div className={classes["review-scores-container"]}>
                <Rating label="Gameplay" rating={props.gameplay} />
                <Rating label="Visuals" rating={props.visuals} />
                <Rating label="Audio" rating={props.audio} />
                <Rating label="Story" rating={props.story} />
                <Rating label="Overall" rating={props.overall} />
            </div>
        </div>
    );
}

export default ReviewScores;