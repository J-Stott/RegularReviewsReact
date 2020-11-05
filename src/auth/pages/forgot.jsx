import React from "react";

import Page from "../../shared/components/Page";
import FormWrapper from "../../shared/FormElements/FormWrapper";
import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";

import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from "../../hooks/http-hook";

import { VALIDATOR_REQUIRE } from "../../shared/FormElements/Validators";
import { useTitle } from "../../hooks/title-hook";
import { conditionalRender } from "../../Utility/RenderUtilities";
import MessageDisplay from "../../shared/components/MessageDisplay";

const ForgotPage = () => {

  const [formState, inputHandler] = useForm({
    user: {
      value: "",
      isValid: false,
    },
  });

  useTitle("Regular Reviews: Forgot Password");

  const { responseMessage, sendRequest } = useHttpClient();

  const formSubmittedHandler = async (event) => {
    event.preventDefault();

    if (formState.formValid) {
      //api call to server
      try {
        const data = await sendRequest(
          "/api/forgot",
          "POST",
          JSON.stringify({ username: formState.inputs.user.value }),
          { "Content-Type": "application/json" }
        );
        console.log(data);
      } catch (err) {}
    }
  };

  return (
    <Page>
          {conditionalRender(
        <MessageDisplay type={responseMessage.type}>
          {responseMessage.message}
        </MessageDisplay>,
        responseMessage.message !== null
      )}
      <FormWrapper>
        <h3>Forgot Password</h3>

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
          <Button type="submit" disabled={!formState.formValid}>
            Reset Password
          </Button>
        </form>
      </FormWrapper>
    </Page>
  );
};

export default ForgotPage;
