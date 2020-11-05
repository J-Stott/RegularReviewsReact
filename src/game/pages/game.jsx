import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import _ from "lodash";

import Page from "../../shared/components/Page";
import GamePanel from "../components/GamePanel";

import Review from "../../shared/components/ReviewComponents/Review";
import GameHeader from "../../shared/components/ReviewComponents/GameHeader";
import ReviewContent from "../../shared/components/ReviewComponents/ReviewContent";

import LoadingSpinner from "../../shared/components/LoadingSpinner";

import { useHttpClient } from "../../hooks/http-hook";
import { useScroll } from "../../hooks/scroll-hook";

import classes from "./game.module.css";
import { useTitle } from "../../hooks/title-hook";

const GamePage = () => {
  const [gameData, setGameData] = useState({});
  const [gameReviews, setGameReviews] = useState([]);
  const { sendRequest } = useHttpClient();
  const gameLink = useParams().gameLink;
  const history = useHistory();

  useEffect(() => {
    const getGameData = async () => {
      try {
        const data = await sendRequest(`/api/games/${gameLink}`);
        setGameData(data.game);
        console.log(data.game);
      } catch (err) {
        console.log(err);
        history.push("/");
      }
    };

    getGameData();
  }, [gameLink]); // eslint-disable-line react-hooks/exhaustive-deps

  useTitle(
    !_.isEmpty(gameData)
      ? `Regular Reviews: ${gameData.displayName}`
      : "Regular Reviews"
  );

  const loadInitialReviews = async (index) => {
    try {
      const data = await sendRequest(`/api/games/${gameLink}/${index}`);
      setGameReviews(data.reviews);
    } catch (err) {
      console.log(err);
    }
  };

  const getMoreReviews = async (index) => {
    const data = await sendRequest(`/api/games/${gameLink}/${index}`);
    if (data.reviews.length === 0) {
      return false;
    } else {
      setGameReviews((prevReviews) => {
        const newReviews = prevReviews.concat(data.reviews);
        return newReviews;
      });
    }

    return true;
  };

  useScroll(loadInitialReviews, getMoreReviews, gameLink);

  if (_.isEmpty(gameData)) {
    return (
      <Page>
        <LoadingSpinner />
      </Page>
    );
  }

  return (
    <Page>
      <GamePanel
        name={gameData.displayName}
        image={gameData.image}
        linkName={gameData.linkName}
        description={gameData.summary}
        numReviews={gameData.numReviews}
        ratingAverages={gameData.ratingAverages}
      />
      <h1 className={classes["review-margin"]}>
        Reviews of {gameData.displayName}
      </h1>

      {gameReviews.map((review) => {
        return (
          <Review key={review._id} reviewId={review._id} link>
            <GameHeader
              id={review._id}
              author={review.author.displayName}
              avatar={review.author.avatar}
              gameName={review.gameId.displayName}
              rating={review.ratings.overall}
              created={new Date(review.created)}
              edited={review.edited ? new Date(review.edited) : null}
              link
            />
            <hr />
            <ReviewContent
              heading={review.title}
              content={review.content}
              short
            />
          </Review>
        );
      })}
    </Page>
  );
};

export default GamePage;
