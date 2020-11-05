import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import RatingButton from "./RatingButton";

import {
  faThumbsUp,
  faThumbsDown,
  faLaughBeam,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useHttpClient } from "../../hooks/http-hook";

import classes from "./RatingButtonManager.module.css";

import { AuthContext } from "../../context/AuthContext";

const RatingButtonManager = (props) => {
  const auth = useContext(AuthContext);
  const [ratingState, setRatingState] = useState({
    reactions: {
      up: 0,
      down: 0,
      funny: 0,
    },
    userReaction: {
      up: 0,
      down: 0,
      funny: 0,
    },
  });

  const reviewId = useParams().reviewId;

  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const getReactionData = async () => {
      try {
        //set initial state after getting data from server
        const data = await sendRequest(`/api/reviews/${reviewId}/reactions`);

        console.log(data);
        setRatingState(data);
      } catch (err) {
        console.log(err);
      }
    };

    getReactionData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const buttonClick = async (id) => {
    try {
      if (auth.isLoggedIn) {
        //set the rating of whatever has been clicked
        const data = await sendRequest(
          `/api/reviews/${reviewId}/reactions/${id}`,
          "POST"
        );

        console.log(data);
        setRatingState(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes["rating-button-container"]}>
      <RatingButton
        id="up"
        userRating={
          ratingState.userReaction ? ratingState.userReaction.up : null
        }
        disabled={!auth.isLoggedIn || props.disabled}
        onClick={buttonClick}
      >
        <FontAwesomeIcon icon={faThumbsUp} /> {ratingState.reactions.up}
      </RatingButton>
      <RatingButton
        id="down"
        userRating={
          ratingState.userReaction ? ratingState.userReaction.down : null
        }
        disabled={!auth.isLoggedIn || props.disabled}
        onClick={buttonClick}
      >
        <FontAwesomeIcon icon={faThumbsDown} /> {ratingState.reactions.down}
      </RatingButton>
      <RatingButton
        id="funny"
        userRating={
          ratingState.userReaction ? ratingState.userReaction.funny : null
        }
        disabled={!auth.isLoggedIn || props.disabled}
        onClick={buttonClick}
      >
        <FontAwesomeIcon icon={faLaughBeam} /> {ratingState.reactions.funny}
      </RatingButton>
    </div>
  );
};

export default RatingButtonManager;
