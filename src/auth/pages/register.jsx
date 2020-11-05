import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./register.module.css";

import Page from "../../shared/components/Page";
import FormWrapper from "../../shared/FormElements/FormWrapper";
import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import MessageDisplay from "../../shared/components/MessageDisplay";
import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from "../../hooks/http-hook";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_PASSWORD,
  VALIDATOR_PASSWORD_COMPARE,
  VALIDATOR_REQUIRE,
  VALIDATOR_USERNAME,
} from "../../shared/FormElements/Validators";
import { conditionalRender } from "../../Utility/RenderUtilities";
import { useTitle } from "../../hooks/title-hook";

const RegisterPage = (props) => {
  const [formState, inputHandler] = useForm({
    username: {
      value: "",
      isValid: false,
    },
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
    password_confirm: {
      value: "",
      isValid: false,
    },
  });

  useTitle("Regular Reviews: Sign Up");

  const {sendRequest} = useHttpClient();

  const [message, setMessage] = useState({
    message: null,
    type: "info",
  });

  const formSubmittedHandler = async (event) => {
    event.preventDefault();

    if (formState.formValid) {
      //send off a request
      console.log(formState);

      try {

        const data = await sendRequest(
          "/api/register",
          "POST",
          JSON.stringify({
            username: formState.inputs.username.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        console.log(data.message);
        setMessage({ message: data.message, type: "success" });
      } catch (err) {
        console.log(err.message);
        setMessage({ message: err.message, type: "fail" });
      }
    }
  };

  return (
    <Page>
      {conditionalRender(
        <MessageDisplay type={message.type}>{message.message}</MessageDisplay>,
        message.message !== null
      )}
      <FormWrapper>
        <h3>Sign Up</h3>
        <form onSubmit={formSubmittedHandler}>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            errorMessage="Usernames may only contain letters, numbers, _, - and ."
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_USERNAME()]}
            onInput={inputHandler}
          />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
            errorMessage="Please submit a valid email address"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            onInput={inputHandler}
          />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            errorMessage="Password must be 8 characters in length and contain at least one uppercase character and one number"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_PASSWORD()]}
            onInput={inputHandler}
          />
          <Input
            id="password_confirm"
            name="password_confirm"
            type="password"
            placeholder="Confirm Password"
            errorMessage="Please ensure both passwords match"
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_PASSWORD_COMPARE(formState.inputs.password.value),
            ]}
            onInput={inputHandler}
          />
          <p className={classes["terms"]}>
            By clicking Register, you agree to our{" "}
            <Link to="/terms">terms</Link> and{" "}
            <Link to="/privacy">privacy policy</Link>
          </p>
          <Button disabled={!formState.formValid}>Register</Button>
        </form>
      </FormWrapper>
    </Page>
  );
};

export default RegisterPage;
