import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Page from "../../shared/components/Page";
import FormWrapper from "../../shared/FormElements/FormWrapper";
import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import MessageDisplay from "../../shared/components/MessageDisplay";

import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from "../../hooks/http-hook";
import { VALIDATOR_REQUIRE } from "../../shared/FormElements/Validators";

import { AuthContext } from "../../context/AuthContext";
import { conditionalRender } from "../../Utility/RenderUtilities";

import classes from "./login.module.css";
import { useTitle } from "../../hooks/title-hook";

const LoginPage = (props) => {
  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm({
    user: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  });

  useTitle("Regular Reviews: Login");

  const { responseMessage, sendRequest} = useHttpClient();

  const formSubmittedHandler = async (event) => {
    event.preventDefault();

    if (formState.formValid) {
      //send off a request
      console.log(formState);

      try {
        const data = await sendRequest(
          "/api/login",
          "POST",
          JSON.stringify({
            username: formState.inputs.user.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        console.log(data.userData);

        auth.login(data.userData, data.expirationTime);
      } catch (err) {
        console.log(err.message);
        
      }
    }
  };

  return (
    <Page>
      {conditionalRender(
        <MessageDisplay type={responseMessage.type}>{responseMessage.message}</MessageDisplay>,
        responseMessage.message !== null
      )}
      <FormWrapper>
        <h3>Login</h3>
        <form onSubmit={formSubmittedHandler}>
          <Input
            id="user"
            name="user"
            type="text"
            placeholder="Username or Email"
            errorMessage="Please enter either your username or email address"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            errorMessage="Please enter a valid password"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <div className={classes["remember"]}>
            <input type="checkbox" name="remember" id="remember" />{" "}
            <label htmlFor="remember">Remember Me</label>
          </div>
          <Button type="submit" disabled={!formState.formValid}>Login</Button>{" "}
          <Link className={classes["forgot"]} to="/forgot">
            Forgot Password?
          </Link>
        </form>
      </FormWrapper>
    </Page>
  );
};

export default LoginPage;
