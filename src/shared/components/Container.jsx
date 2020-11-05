import React from "react";
import classes from "./Container.module.css";

import {classOnProp} from "../../Utility/CssUtilities";

const Container = (props) => {
    return(
        <div className={`${classes["container"]}  ${classOnProp(props.fillHeight, classes, "fill-height")} ${classOnProp(props.topPadding, classes, "top-padding")}`}>
            {props.children}
        </div>
    );
}

export default Container;