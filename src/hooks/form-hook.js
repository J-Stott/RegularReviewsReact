import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;

      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        formValid: formIsValid,
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        formValid: action.isValid,
      };
    default:
      return state;
  }
};

const getFormValidity = (inputs) => {
  for (const inputId in inputs) {
    if (!inputs[inputId].isValid) {
      //console.log(inputId);
      return false;
    }
  }

  return true;
};

//form hook that will store the values and validity of each input.
//used whenever a form is submitted to send data to server

export const useForm = (initialInputs) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    formValid: getFormValidity(initialInputs),
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      inputId: id,
      value: value,
      isValid: isValid,
    });
  }, []);

  const setFormData = useCallback((inputData) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      isValid: getFormValidity(inputData),
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
