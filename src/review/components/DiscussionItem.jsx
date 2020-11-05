import React, { useState } from "react";

import ContentWrapper from "../../shared/components/ContentWrapper";
import TextArea from "../../shared/FormElements/TextArea";
import Button from "../../shared/FormElements/Button";

import classes from "./DiscussionItem.module.css";

import { conditionalRender, pickRender } from "../../Utility/RenderUtilities";

import { useForm } from "../../hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/FormElements/Validators";

const DiscussionItem = (props) => {
  const [editing, setEditing] = useState(false);

  const [formState, inputHandler] = useForm({
    comment: {
      value: props.comment,
      isValid: true,
    },
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (formState.formValid) {
      props.editHandler(props.id, formState.inputs.comment.value);
      setEditing(false);
    }
  };

  const toggleEditHandler = () => {
    setEditing((prevState) => {
      return !prevState;
    });
  };

  const commentContent = (
    <React.Fragment>
      <div className={classes["avatar-container"]}>
        <img className={classes["avatar"]} src={props.avatar} alt="avatar" />
      </div>
      <div className={classes["content-container"]}>
        <div className={classes["author-container"]}>{props.author}</div>
        <div className={classes["comment-container"]}>{props.comment}</div>
        {conditionalRender(
          <div className={classes["button-container"]}>
            <Button onClick={toggleEditHandler}>Edit</Button>
            <Button danger onClick={props.deleteHandler}>
              Delete
            </Button>
          </div>,
          props.admin
        )}
      </div>
    </React.Fragment>
  );

  const editBox = (
    <form onSubmit={formSubmitHandler}>
      <TextArea
        id="comment"
        name="comment"
        placeholder="Edit your Comment"
        onInput={inputHandler}
        initialValue={props.comment}
        valid={true}
        validators={[VALIDATOR_REQUIRE()]}
        rows="4"
      />
      <div className={classes["button-container"]}>
        <Button type="button" onClick={toggleEditHandler}>
          Cancel
        </Button>
        <Button type="submit" disabled={!formState.formValid}>
          Submit
        </Button>
      </div>
    </form>
  );

  return (
    <ContentWrapper>
      <div className={classes["content"]}>
        {pickRender(commentContent, editBox, !editing)}
      </div>
    </ContentWrapper>
  );
};

export default DiscussionItem;
