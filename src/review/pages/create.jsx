import React from "react";

import Page from "../../shared/components/Page";
import ReviewForm from "../../shared/FormElements/ReviewForm";
import { useTitle } from "../../hooks/title-hook";

const CreatePage = (props) => {
  useTitle("Regular Reviews: Create Review");

  return (
    <Page>
      <ReviewForm
        heading="Create your Review"
        draftRoute="/api/drafts/create"
        reviewRoute="/api/reviews/create"
        draftMethod="POST"
        reviewMethod="POST"
      />
    </Page>
  );
};

export default CreatePage;
