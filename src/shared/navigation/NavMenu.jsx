import React from "react";
import classes from "./NavMenu.module.css";

import {conditionalRender} from "../../Utility/RenderUtilities";

//nav menu renders depending on if the user has toggled it or not

const NavMenu = (props) => {
    return(
        conditionalRender(<div onClick={props.hideHandler} className={classes["nav-menu"]}>
            {props.children}
        </div>, props.visible)
    );
}

export default NavMenu;