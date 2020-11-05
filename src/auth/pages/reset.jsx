import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from "../../hooks/http-hook";
import { useTitle } from "../../hooks/title-hook";
import MessageDisplay from "../../shared/components/MessageDisplay";
import Page from "../../shared/components/Page";
import Button from "../../shared/FormElements/Button";
import FormWrapper from "../../shared/FormElements/FormWrapper";
import Input from "../../shared/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_PASSWORD,
  VALIDATOR_PASSWORD_COMPARE,
} from "../../shared/FormElements/Validators";
import { conditionalRender } from "../../Utility/RenderUtilities";

const ResetPage = () => {

  const token = useParams().token;
  const history = useHistory();

  const [formState, inputHandler] = useForm({
    password: {
      value: "",
      isValid: false,
    },
    password_confirm: {
      value: "",
      isValid: false,
    },
  });

  useEffect(() => {
    const checkToken = async () => {
      try {
        await sendRequest(`/reset/${token}`);
      } catch (err) {
        console.log(err.message);
        history.push("/");
      }
    };

    checkToken();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useTitle("Regular Reviews: Reset Password");

  const { responseMessage, sendRequest } = useHttpClient();

  const formSubmittedHandler = async (event) => {
    event.preventDefault();

    if (formState.formValid) {
      //send off a request
      console.log(formState);

      try {
        await sendRequest(
          `/api/reset/${token}`,
          "POST",
          JSON.stringify({
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        setTimeout(() => {
          history.push("/login");
        }, 3000);
      } catch (err) {
        console.log(err.message);
      }
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
        <h3>Reset Password</h3>
        <form onSubmit={formSubmittedHandler}>
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
          <Button type="submit" disabled={!formState.formValid}>Reset Password</Button>
        </form>
      </FormWrapper>
    </Page>
  );
};

export default ResetPage;
