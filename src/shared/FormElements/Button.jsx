import React from "react";
import {Link} from "react-router-dom";

import classes from "./Button.module.css";

const Button = (props) => {

    let buttonClass = classes["button-default"];

    if(props.danger){
        buttonClass = classes["button-danger"];
    } else if(props.outline) {
        buttonClass = classes["button-outline"];
    }

    let button = null;

    if(props.link) {
        button = (
            <Link to={props.link} className={`${buttonClass} ${props.className || ""}`}>{props.children}</Link>
        );
    } else {
        button = (
            <button type={props.type} onClick={props.onClick} onTouchStart={props.onTouchStart} className={`${buttonClass} ${props.className || ""}`} disabled={props.disabled}>{props.children}</button>
        );
    }

    return(
        button
    );
}

export default Button;