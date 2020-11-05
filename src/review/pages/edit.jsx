import React from "react";

import { useParams } from "react-router-dom";

import Page from "../../shared/components/Page";
import ReviewForm from "../../shared/FormElements/ReviewForm";
import { useTitle } from "../../hooks/title-hook";

const EditPage = () => {
  useTitle("Regular Reviews: Edit Review");
  const reviewId = useParams().reviewId;

  return (
    <Page>
      <ReviewForm
        heading="Edit your Review"
        reviewRoute={`/api/reviews/${reviewId}`}
        editData={`/api/reviews/${reviewId}`}
        reviewMethod="PATCH"
        searchDisabled
        discussionDisabled
      />
    </Page>
  );
};

export default EditPage;
