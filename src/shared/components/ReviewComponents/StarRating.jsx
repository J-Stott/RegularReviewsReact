import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import classes from "./StarRating.module.css";

import {addClasses} from "../../../Utility/CssUtilities";

const MAX_RATING = 5;

const StarRating = (props) => {

    let starClassNames = [];
    let star = props.big ? "star-big" : "star";

    for(let i = 0; i < props.rating; i++){
        starClassNames.push("star-highlight");
    }

    for(let i = 0; i < MAX_RATING - props.rating; i++){
        starClassNames.push("star-lowlight");
    }

    return(
        <div className={classes["star-container"]}>
            <FontAwesomeIcon className={addClasses(classes, [star, starClassNames[0]])} icon={faStar} /> <FontAwesomeIcon className={addClasses(classes, [star, starClassNames[1]])} icon={faStar} /> <FontAwesomeIcon className={addClasses(classes, [star, starClassNames[2]])} icon={faStar} /> <FontAwesomeIcon className={addClasses(classes, [star, starClassNames[3]])} icon={faStar} /> <FontAwesomeIcon className={addClasses(classes, [star, starClassNames[4]])} icon={faStar} /> 
        </div>
    );
}

export default StarRating;