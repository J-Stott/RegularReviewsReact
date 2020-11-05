import React from "react";
import classes from "./FlexContainer.module.css";

import {classOnProp} from "../../Utility/CssUtilities";

const FlexContainer = (props) => {
    return(
        <div className={`${classOnProp(props.row, classes, "flex-row")} ${classOnProp(props.col, classes, "flex-col")} ${classOnProp(props.col, classes, "flex-col")} ${classOnProp(props.align, classes, "align-center")} ${classOnProp(props.justify, classes, "justify-center")} ${classOnProp(props.fill, classes, "fill-space")}`}>
            {props.children}
        </div>
    );
}

export default FlexContainer;