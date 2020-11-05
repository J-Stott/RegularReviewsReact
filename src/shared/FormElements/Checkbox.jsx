import React, {useEffect} from "react";

import { useInput } from "../../hooks/input-hook";

const Checkbox = (props) => {

    const initialValue = false;
    const valid = true;
  
    const [inputState, changeHandler] = useInput(initialValue, valid, []);
  
    const { id, onInput } = props;
    const { value, isValid } = inputState;
  
    useEffect(() => {
      //passes input data up to formState management
      onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    return(
        <React.Fragment>
            <input type="checkbox" name={props.id} id={props.id} onChange={(event) => {
                changeHandler(event, "checked");
            }}/>
            <label htmlFor={props.id}>{props.label}</label>
        </React.Fragment>
    );
}

export default Checkbox;