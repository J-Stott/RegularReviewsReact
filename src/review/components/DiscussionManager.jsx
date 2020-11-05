import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";

import ContentWrapper from "../../shared/components/ContentWrapper";
import DiscussionItem from "./DiscussionItem";

import Button from "../../shared/FormElements/Button";
import Modal from "../../shared/components/Modal/Modal";
import ModalDeleteContent from "../../shared/components/Modal/ModalDeleteContent";

import { useForm } from "../../hooks/form-hook";
import { useModal } from "../../hooks/modal-hook";
import { useHttpClient } from "../../hooks/http-hook";
import { useScroll } from "../../hooks/scroll-hook";

import classes from "./DiscussionManager.module.css";

import { AuthContext } from "../../context/AuthContext";
import {
  conditionalRender,
  getUniqueArray,
} from "../../Utility/RenderUtilities";

const DiscussionManager = (props) => {
  const reviewId = useParams().reviewId;

  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm({
    comment: {
      value: "",
      isValid: false,
    },
  });

  const [commentValue, setCommentValue] = useState("");
  const [discussionData, setDiscussionData] = useState([]);

  const [modalVisible, , hideModal, deleteRoute, setDeleteRoute] = useModal();

  const loadInitialComments = async (index) => {
    try {
      const data = await sendRequest(`/api/reviews/${reviewId}/comments/${index}`);
      setDiscussionData(data.comments);
    } catch (err) {
      console.log(err);
    }
  };

  const getMoreComments = async (index) => {
    const data = await sendRequest(`/api/reviews/${reviewId}/comments/${index}`);
    if (data.comments.length === 0) {
      return false;
    } else {
      setDiscussionData((prevComments) => {
        let newComments = [...prevComments];

        newComments = getUniqueArray(newComments, data.comments);

        return newComments;
      });
    }

    return true;
  };

  useScroll(loadInitialComments, getMoreComments);

  const commentSubmitHandler = async (event) => {
    event.preventDefault();

    if (formState.formValid) {
      try {
        const data = await sendRequest(
          `/api/reviews/${reviewId}/comments`,
          "POST",
          JSON.stringify({
            comment: formState.inputs.comment.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        setDiscussionData((prevData) => {
          const newData = [...prevData];

          const comment = data;
          newData.push(comment);
          return newData;
        });

        //resets text
        setCommentValue("");
        setFormData({
          comment: {
            value: "",
            isValid: false,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const commentEditHandler = async (id, editedComment) => {
    const url = `/api/reviews/${reviewId}/comments/${id}`;
    try {
      const data = await sendRequest(
        url,
        "PATCH",
        JSON.stringify({
          comment: editedComment,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      const index = discussionData.findIndex(
        (comment) => comment.id === data.index
      );

      setDiscussionData((prevData) => {
        const newData = [...prevData];

        const newComment = { ...newData[index] };
        newComment.comment = data.comment;
        newData[index] = newComment;
        return newData;
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async () => {
    hideModal();
    console.log(deleteRoute);

    try {
      const data = await sendRequest(deleteRoute, "DELETE");
      console.log(data);

      setDiscussionData((prevDiscussion) => {
        const newComments = prevDiscussion.filter((comment) => {
          return comment._id !== data.id;
        });

        return newComments;
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ContentWrapper>
      <Modal show={modalVisible} hideModal={hideModal}>
        <ModalDeleteContent
          deleteMessage="Are you sure you want to delete this comment? This cannot be undone."
          delete={deleteHandler}
          close={hideModal}
        />
      </Modal>
      <h2 className={classes["heading-margin"]}>Discussion</h2>
      {conditionalRender(
        <form onSubmit={commentSubmitHandler}>
          <div className={classes["form-control"]}>
            <textarea
              id="comment"
              placeholder="Post a comment!"
              onChange={(event) => {
                const value = event.target.value;
                setCommentValue(value);
                inputHandler("comment", value, value !== "");
              }}
              value={commentValue}
              rows="4"
            ></textarea>
          </div>
          <div className={classes["post-button"]}>
            <Button type="submit" disabled={!formState.formValid}>
              Post comment!
            </Button>
          </div>
        </form>,
        auth.isLoggedIn
      )}
      {discussionData.map((comment) => {
        return (
          <DiscussionItem
            key={comment._id}
            id={comment._id}
            author={comment.user.displayName}
            avatar={comment.user.avatar}
            comment={comment.comment}
            admin={comment.admin}
            deleteHandler={() => {
              setDeleteRoute(`/api/reviews/${reviewId}/comments/${comment._id}`);
            }}
            editHandler={commentEditHandler}
          />
        );
      })}
    </ContentWrapper>
  );
};

export default DiscussionManager;
