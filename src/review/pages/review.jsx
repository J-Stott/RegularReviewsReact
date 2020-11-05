import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import _ from "lodash";

import Page from "../../shared/components/Page";
import Review from "../../shared/components/ReviewComponents/Review";
import ReviewHeader from "../../shared/components/ReviewComponents/ReviewHeader";
import ReviewContent from "../../shared/components/ReviewComponents/ReviewContent";
import ReviewScores from "../../shared/components/ReviewComponents/ReviewScores";
import RatingButtonManager from "../components/RatingButtonManager";
import ManagementButtons from "../../shared/components/ReviewComponents/ManagementButtons";

import DiscussionManager from "../components/DiscussionManager";

import Modal from "../../shared/components/Modal/Modal";
import ModalDeleteContent from "../../shared/components/Modal/ModalDeleteContent";

import { useModal } from "../../hooks/modal-hook";
import { useHttpClient } from "../../hooks/http-hook";
import { useTitle } from "../../hooks/title-hook";

import { conditionalRender } from "../../Utility/RenderUtilities";

const ReviewPage = () => {

  const { sendRequest } = useHttpClient();
  const reviewId = useParams().reviewId;
  const history = useHistory();

  const [reviewData, setReviewData] = useState({});

  useEffect(() => {
    const getReviewData = async () => {
      try {
        const data = await sendRequest(`/api/reviews/${reviewId}`);

        console.log(data.review);
        setReviewData(data.review);
      } catch (err) {
        console.log(err);
      }
    };

    getReviewData();
  }, [reviewId]); // eslint-disable-line react-hooks/exhaustive-deps

  const [modalVisible, , hideModal, deleteRoute, setDeleteRoute] = useModal();

  const deleteHandler = async () => {
    hideModal();
    try {
      await sendRequest(deleteRoute, "DELETE");

      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  
  useTitle(!_.isEmpty(reviewData) ? `Regular Reviews: ${reviewData.gameId.displayName} by ${reviewData.author.displayName}` : "Regular Reviews");

  if(_.isEmpty(reviewData)){
    return(<p>Loading...</p>)
  }


  return (
    <Page>
      <Modal show={modalVisible} hideModal={hideModal}>
        <ModalDeleteContent
          deleteMessage="Are you sure you want to delete this review? This cannot be undone."
          delete={deleteHandler}
          close={hideModal}
        />
      </Modal>
      <Review reviewId={reviewData._id}>
        <ReviewHeader
          id={reviewData._id}
          gameLink={reviewData.gameId.linkName}
          imageUrl={reviewData.gameId.image}
          gameName={reviewData.gameId.displayName}
          author={reviewData.author.displayName}
          rating={reviewData.ratings.overall}
          avatar={reviewData.author.avatar}
          created={new Date(reviewData.created)}
          edited={reviewData.edited ? new Date(reviewData.edited) : null}
        />
        <hr />
        <ReviewContent
          heading={reviewData.title}
          content={reviewData.content}
        />
        <hr />
        <ReviewScores
          gameplay={reviewData.ratings.gameplay}
          visuals={reviewData.ratings.visuals}
          audio={reviewData.ratings.audio}
          story={reviewData.ratings.story}
          overall={reviewData.ratings.overall}
        />
        <RatingButtonManager disabled={reviewData.adminStatus === "author" ? true : false}/>
        {conditionalRender(
          <ManagementButtons
            delete
            adminStatus={reviewData.adminStatus || ""}
            editLink={reviewData.adminStatus === "author" ? `/reviews/${reviewData._id}/edit` : null}
            deleteClick={() => {
              setDeleteRoute(`/api/reviews/${reviewData._id}`);
            }}
          />,
          !!reviewData.adminStatus
        )}
      </Review>

      {conditionalRender(<DiscussionManager />, !!reviewData.discussion)}
    </Page>
  );
};

export default ReviewPage;
