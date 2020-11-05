import React from "react";
import Container from "./Container";

import {conditionalRender} from "../../Utility/RenderUtilities";

import classes from "./Page.module.css";

const Page = (props) => {
    return(
        <Container topPadding>
            {conditionalRender(<h1 className={classes["heading"]}>{props.heading}</h1>, !!props.heading)}
            {props.children}
        </Container>
    );
}

export default Page;