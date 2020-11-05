import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import _ from "lodash";

import Page from "../../shared/components/Page";
import AboutPanel from "../components/AboutPanel";

import LoadingSpinner from "../../shared/components/LoadingSpinner";
import Review from "../../shared/components/ReviewComponents/Review";
import UserHeader from "../../shared/components/ReviewComponents/UserHeader";
import ReviewContent from "../../shared/components/ReviewComponents/ReviewContent";
import { useHttpClient } from "../../hooks/http-hook";
import { useScroll } from "../../hooks/scroll-hook";

import classes from "./user.module.css";
import { useTitle } from "../../hooks/title-hook";
import { conditionalRender } from "../../Utility/RenderUtilities";

const UserPage = () => {
  const [userData, setUserData] = useState({});
  const [userReviews, setUserReviews] = useState([]);
  const username = useParams().username;
  const { isLoading, sendRequest } = useHttpClient();
  const history = useHistory();

  useTitle(`Regular Reviews: ${username}'s Profile`);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await sendRequest(`/api/users/${username}`);
        setUserData(data);
      } catch (err) {
        console.log(err);
        history.push("/");
      }
    };

    getUserData();
  }, [username]); // eslint-disable-line react-hooks/exhaustive-deps

  const getInitialReviewData = async (index) => {
    try {
      const data = await sendRequest(`/api/users/${username}/reviews/${index}`);
      setUserReviews(data.reviews);
    } catch (err) {
      console.log(err);
    }
  };

  const getMoreReviewData = async (index) => {
    const data = await sendRequest(`/api/users/${username}/reviews/${index}`);
    if (data.reviews.length === 0) {
      return false;
    } else {
      setUserReviews((prevReviews) => {
        const newReviews = prevReviews.concat(data.reviews);
        return newReviews;
      });
    }

    return true;
  };

  useScroll(getInitialReviewData, getMoreReviewData, username);

  if (_.isEmpty(userData)) {
    return (
      <Page>
        <LoadingSpinner />
      </Page>
    );
  }

  return (
    <Page>
      <AboutPanel
        name={userData.displayName}
        avatar={userData.avatar}
        bio={userData.bio}
        numReviews={userData.numReviews}
      />
      <h1 className={classes["review-margin"]}>
        {userData.displayName}'s Reviews
      </h1>

      {userReviews.length > 0 ? (
        userReviews.map((review) => {
          return (
            <Review key={review._id} reviewId={review._id} link>
              <UserHeader
                id={review._id}
                gameLink={review.gameId.linkName}
                imageUrl={review.gameId.image}
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
        })
      ) : (
        <p>{userData.displayName} hasn't written a review yet</p>
      )}
      {conditionalRender(<LoadingSpinner />, isLoading)}
    </Page>
  );
};

export default UserPage;
