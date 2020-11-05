import React, { useState } from "react";

import Page from "../../shared/components/Page";
import Review from "../../shared/components/ReviewComponents/Review";
import ReviewHeader from "../../shared/components/ReviewComponents/ReviewHeader";
import ReviewContent from "../../shared/components/ReviewComponents/ReviewContent";
import LoadingSpinner from "../../shared/components/LoadingSpinner";

import { useScroll } from "../../hooks/scroll-hook";
import { useHttpClient } from "../../hooks/http-hook";
import { useTitle } from "../../hooks/title-hook";
import {
  conditionalRender,
  getUniqueArray,
} from "../../Utility/RenderUtilities";

const HomePage = () => {
  const [reviewData, setReviewData] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();

  const loadInitialReviews = async (index) => {
    try {
      const data = await sendRequest(`/api/index/${index}`);
      setReviewData(data.reviews);
    } catch (err) {
      console.log(err);
    }
  };

  const getMoreReviews = async (index) => {
    const data = await sendRequest(`/api/index/${index}`);
    if (data.reviews.length === 0) {
      return false;
    } else {
      setReviewData((prevReviews) => {
        let newReviews = [...prevReviews];

        newReviews = getUniqueArray(newReviews, data.reviews);
        return newReviews;
      });
    }

    return true;
  };

  useTitle("Regular Reviews: Home");
  useScroll(loadInitialReviews, getMoreReviews, null);

  return (
    <Page heading="Latest Reviews">
      {reviewData.map((review) => {
        return (
          <Review key={review._id} reviewId={review._id} link>
            <ReviewHeader
              id={review._id}
              gameLink={review.gameId.linkName}
              imageUrl={review.gameId.image}
              gameName={review.gameId.displayName}
              author={review.author.displayName}
              rating={review.ratings.overall}
              avatar={review.author.avatar}
              created={new Date(review.created)}
              edited={review.edited ? new Date(review.edited) : null}
              link
            />
            <hr />
            <ReviewContent
              short
              heading={review.title}
              content={review.content}
            />
          </Review>
        );
      })}
      {conditionalRender(<LoadingSpinner />, isLoading)}
    </Page>
  );
};

export default HomePage;
