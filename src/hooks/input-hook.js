import { useCallback, useReducer } from "react";
import { validate } from "../shared/FormElements/Validators";

const CHANGE = "CHANGE";
const FOCUS = "FOCUS";
const UNFOCUS = "UNFOCUS"

const inputReducer = (state, action) => {
  switch (action.type) {
    case CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
        isModified: true,
      };
    case FOCUS:
      return {
        ...state,
        isFocused: true,
      };
    case UNFOCUS:
      return {
        ...state,
        isFocused: false,
      };
    default:
      return state;
  }
};

//handles the state of an individual input component

export const useInput = (initialValue, valid, validators) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue,
    isValid: valid,
    isModified: false,
    isFocused: false,
  });

  const changeHandler = useCallback(
    (event, eventType = "value") => {
      dispatch({
        type: CHANGE,
        value: event.target[eventType],
        validators: validators,
      });
    },
    [validators]
  );

  const focusHandler = useCallback(() => {
    dispatch({ type: FOCUS });
  }, []);

  const unfocusHandler = useCallback(() => {
    dispatch({ type: UNFOCUS });
  }, []);

  return [inputState, changeHandler, focusHandler, unfocusHandler];
};
