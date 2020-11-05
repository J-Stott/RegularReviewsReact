import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import ContentWrapper from "../components/ContentWrapper";
import ReviewSearchBar from "./ReviewSearchBar";
import Input from "./Input";
import TextArea from "./TextArea";
import ReviewScore from "./ReviewScore";
import Checkbox from "./Checkbox";
import Button from "./Button";
import LoadingSpinner from "../components/LoadingSpinner";

import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from "../../hooks/http-hook";

import { VALIDATOR_REQUIRE } from "./Validators";

import { conditionalRender } from "../../Utility/RenderUtilities";
import { AuthContext } from "../../context/AuthContext";

import classes from "./ReviewForm.module.css";
import MessageDisplay from "../components/MessageDisplay";

const ReviewForm = (props) => {
  const auth = useContext(AuthContext);
  const [renderForm, setRenderForm] = useState(false);

  const { sendRequest, responseMessage } = useHttpClient();
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm({
    gameId: {
      value: "",
      isValid: false,
    },
    gameName: {
      value: "",
      isValid: false,
    },
    title: {
      value: "",
      isValid: false,
    },
    content: {
      value: "",
      isValid: false,
    },
    gameplay: {
      value: "",
      isValid: true,
    },
    visuals: {
      value: "",
      isValid: true,
    },
    audio: {
      value: "",
      isValid: true,
    },
    story: {
      value: "",
      isValid: true,
    },
    overall: {
      value: "",
      isValid: true,
    },
    discussion: {
      value: false,
      isValid: true,
    },
  });

  useEffect(() => {
    const getEditData = async () => {
      try {
        const data = await sendRequest(props.editData);
        console.log(data);
        const review = data.review;
        setFormData({
          gameId: {
            value: review.gameId.igdbId,
            isValid: true,
          },
          gameName: {
            value: review.gameId.displayName,
            isValid: true,
          },
          title: {
            value: review.title,
            isValid: true,
          },
          content: {
            value: review.content,
            isValid: true,
          },
          gameplay: {
            value: review.ratings.gameplay,
            isValid: true,
          },
          visuals: {
            value: review.ratings.visuals,
            isValid: true,
          },
          audio: {
            value: review.ratings.audio,
            isValid: true,
          },
          story: {
            value: review.ratings.story,
            isValid: true,
          },
          overall: {
            value: review.ratings.overall,
            isValid: true,
          },
          discussion: {
            value: false,
            isValid: true,
          },
        });
        setRenderForm(true);
      } catch (err) {
        console.log(err);
      }
    };

    const getGameData = async () => {
      try {
        const data = await sendRequest(props.gameRoute);
        console.log(data);
        setFormData({
          gameId: {
            value: data.gameId.igdbId,
            isValid: true,
          },
          gameName: {
            value: data.gameId.displayName,
            isValid: true,
          },
          title: {
            value: "",
            isValid: false,
          },
          content: {
            value: "",
            isValid: false,
          },
          gameplay: {
            value: "",
            isValid: true,
          },
          visuals: {
            value: "",
            isValid: true,
          },
          audio: {
            value: "",
            isValid: true,
          },
          story: {
            value: "",
            isValid: true,
          },
          overall: {
            value: "",
            isValid: true,
          },
          discussion: {
            value: false,
            isValid: true,
          },
        });
        setRenderForm(true);
      } catch (err) {
        console.log(err);
        history.push("/reviews/create");
      }
    };

    if (props.editData) {
      getEditData();
    } else if (props.gameRoute) {
      getGameData();
    } else {
      setRenderForm(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const draftSubmittedHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        props.draftRoute,
        props.draftMethod,
        JSON.stringify({
          igdbId: formState.inputs.gameId.value,
          title: formState.inputs.title.value,
          content: formState.inputs.content.value,
          gameplay: formState.inputs.gameplay.value,
          visuals: formState.inputs.visuals.value,
          audio: formState.inputs.audio.value,
          story: formState.inputs.story.value,
          overall: formState.inputs.overall.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      history.push(`/drafts/${auth.userData.displayName}`);
    } catch (err) {
      console.log(err);
    }
  };

  const reviewSubmittedHandler = async (event) => {
    event.preventDefault();

    try {
      const data = await sendRequest(
        props.reviewRoute,
        props.reviewMethod,
        JSON.stringify({
          igdbId: formState.inputs.gameId.value,
          title: formState.inputs.title.value,
          content: formState.inputs.content.value,
          gameplay: formState.inputs.gameplay.value,
          visuals: formState.inputs.visuals.value,
          audio: formState.inputs.audio.value,
          story: formState.inputs.story.value,
          overall: formState.inputs.overall.value,
          discussion: formState.inputs.discussion.value,
          draftId: props.draftId || null,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      history.push(`/reviews/${data.reviewId}`);
    } catch (err) {
      console.log(err);
    }
  };

  if (!renderForm) {
    return (
      <ContentWrapper>
        <LoadingSpinner />
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper>
      {conditionalRender(
        <MessageDisplay type={responseMessage.type}>
          {responseMessage.message}
        </MessageDisplay>,
        responseMessage.message !== null
      )}
      <h2>{props.heading}</h2>
      {conditionalRender(
        <form onSubmit={reviewSubmittedHandler}>
          <ReviewSearchBar
            dbId="gameId"
            valueId="gameName"
            placeholder="Search for Game"
            formInputHandler={inputHandler}
            initialName={formState.inputs.gameName.value || ""}
            initialIgdbId={formState.inputs.gameId.value || ""}
            disabled={props.searchDisabled}
          />
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Review Title"
            onInput={inputHandler}
            initialValue={formState.inputs.title.value || ""}
            valid={formState.inputs.title.value !== ""}
            validators={[VALIDATOR_REQUIRE()]}
            autoComplete="off"
          />
          <TextArea
            id="content"
            name="content"
            placeholder="Review content"
            onInput={inputHandler}
            initialValue={formState.inputs.content.value || ""}
            valid={formState.inputs.content.value !== ""}
            validators={[VALIDATOR_REQUIRE()]}
            rows="15"
          />
          <div>
            <h3>Ratings</h3>
            <div className={classes["ratings-container"]}>
              <ReviewScore
                label="Gameplay"
                id="gameplay"
                onInput={inputHandler}
                initialValue={formState.inputs.gameplay.value || 0}
              />
              <ReviewScore
                label="Visuals"
                id="visuals"
                onInput={inputHandler}
                initialValue={formState.inputs.visuals.value || 0}
              />
              <ReviewScore
                label="Audio"
                id="audio"
                onInput={inputHandler}
                initialValue={formState.inputs.audio.value || 0}
              />
              <ReviewScore
                label="Story"
                id="story"
                onInput={inputHandler}
                initialValue={formState.inputs.story.value || 0}
              />
              <ReviewScore
                label="Overall"
                id="overall"
                onInput={inputHandler}
                initialValue={formState.inputs.overall.value || 0}
              />
            </div>
          </div>
          {conditionalRender(
            <div className={classes["checkbox-container"]}>
              <Checkbox
                id="discussion"
                label="Create Review Discussion"
                onInput={inputHandler}
              />
            </div>,
            !props.discussionDisabled
          )}

          <div className={classes["button-container"]}>
            {conditionalRender(
              <Button
                className={classes["button-gap"]}
                onClick={draftSubmittedHandler}
                onTouchStart={draftSubmittedHandler}
                type="button"
                disabled={!formState.formValid}
              >
                Draft
              </Button>,
              !!props.draftRoute
            )}

            <Button type="submit" disabled={!formState.formValid}>
              Post
            </Button>
          </div>
        </form>,
        renderForm
      )}
    </ContentWrapper>
  );
};

export default ReviewForm;
