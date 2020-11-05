import React from "react";

import ContentWrapper from "../ContentWrapper";

import classes from "./Review.module.css";

const Review = (props) => {

  const review = props.link ? (
    <div className={classes["review"]} >
      <ContentWrapper hoverable>{props.children}</ContentWrapper>
    </div>
  ) : (
    <div className={classes["review"]}>
      <ContentWrapper>{props.children}</ContentWrapper>
    </div>
  );

  return review;
};

export default Review;
