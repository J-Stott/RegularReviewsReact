import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Page from "../../shared/components/Page";
import Modal from "../../shared/components/Modal/Modal";
import ModalDeleteContent from "../../shared/components/Modal/ModalDeleteContent";

import Review from "../../shared/components/ReviewComponents/Review";
import DraftHeader from "../../shared/components/ReviewComponents/DraftHeader";
import ReviewContent from "../../shared/components/ReviewComponents/ReviewContent";
import ManagementButtons from "../../shared/components/ReviewComponents/ManagementButtons";

import { useModal } from "../../hooks/modal-hook";
import { useHttpClient } from "../../hooks/http-hook";
import { useTitle } from "../../hooks/title-hook";

const DraftsPage = () => {
  const [userDrafts, setUserDrafts] = useState([]);
  const [modalVisible, , hideModal, deleteRoute, setDeleteRoute] = useModal();
  const { sendRequest } = useHttpClient();
  const username = useParams().username;

  useEffect(() => {
    const getUserDrafts = async () => {
      try {
        const data = await sendRequest(`/api/drafts/${username}`);
        setUserDrafts(data);
      } catch (err) {
        console.log(err);
      }
    };

    getUserDrafts();
  }, [username]); // eslint-disable-line react-hooks/exhaustive-deps

  useTitle("Regular Reviews: Your Drafts");

  const deleteHandler = async() => {
    hideModal();

    try{
      const data = await sendRequest(deleteRoute, "DELETE");
      setUserDrafts((prevDrafts) => {
        const newDrafts = prevDrafts.filter((draft) => {
          return draft._id !== data.draftId;
        })

        return newDrafts;
      })
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <Page heading="Your Drafts">
      <Modal show={modalVisible} hideModal={hideModal}>
        <ModalDeleteContent
          deleteMessage="Are you sure you wish to delete this draft?"
          delete={deleteHandler}
          close={hideModal}
        />
      </Modal>
      {userDrafts.map((data) => {
        return (
          <Review key={data._id} reviewId={data._id}>
            <DraftHeader
              id={data._id}
              gameLink={data.gameId.linkName}
              imageUrl={data.gameId.image}
              gameName={data.gameId.displayName}
              rating={data.ratings.overall}
            />
            <hr />
            <ReviewContent heading={data.title} content={data.content} />
            <ManagementButtons
              editLink={`/drafts/${data._id}/edit`}
              deleteClick={() => {
                setDeleteRoute(`/api/drafts/${data._id}`);
              }}
            />
          </Review>
        );
      })}
    </Page>
  );
};

export default DraftsPage;
