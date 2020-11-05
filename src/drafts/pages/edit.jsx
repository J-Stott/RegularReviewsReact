import React from "react";

import { useParams } from "react-router-dom";
import { useTitle } from "../../hooks/title-hook";

import Page from "../../shared/components/Page";
import ReviewForm from "../../shared/FormElements/ReviewForm";

const EditPage = () => {
  const draftId = useParams().draftId;

  useTitle("Regular Reviews: Edit Draft");

  return (
    <Page>
      <ReviewForm
        heading="Edit your Draft"
        draftRoute={`/api/drafts/${draftId}`}
        reviewRoute="/api/reviews/create"
        editData={`/api/drafts/${draftId}/edit`}
        draftId={draftId}
        draftMethod="PATCH"
        reviewMethod="POST"
      />
    </Page>
  );
};

export default EditPage;
