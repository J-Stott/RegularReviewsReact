import React from "react";
import classes from "./FormWrapper.module.css";

const FormWrapper = (props) => {

    return(
        <div className={classes["form-wrapper"]}>
            {props.children}
        </div>
    );
}

export default FormWrapper;