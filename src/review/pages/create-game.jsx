import React from "react";
import { useParams } from "react-router-dom";

import Page from "../../shared/components/Page";
import ReviewForm from "../../shared/FormElements/ReviewForm";
import { useTitle } from "../../hooks/title-hook";

const CreateGamePage = (props) => {
  useTitle("Regular Reviews: Create Review");
  const linkName = useParams().linkName;

  return (
    <Page>
      <ReviewForm
        heading="Create your Review"
        draftRoute="/api/drafts/create"
        gameRoute={`/api/reviews/create/${linkName}`}
        reviewRoute="/api/reviews/create"
        draftMethod="POST"
        reviewMethod="POST"
      />
    </Page>
  );
};

export default CreateGamePage;
