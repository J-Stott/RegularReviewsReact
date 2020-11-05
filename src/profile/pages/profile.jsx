import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import _ from "lodash";

import Page from "../../shared/components/Page";

import ContentWrapper from "../../shared/components/ContentWrapper";
import ProfileForm from "../components/ProfileForm";
import ProfileDelete from "../components/ProfileDelete";
import ProfileImagePicker from "../components/ProfileImagePicker";
import Modal from "../../shared/components/Modal/Modal";
import ModalDeleteContent from "../../shared/components/Modal/ModalDeleteContent";
import MessageDisplay from "../../shared/components/MessageDisplay";

import { AuthContext } from "../../context/AuthContext";
import { useForm } from "../../hooks/form-hook";
import { useModal } from "../../hooks/modal-hook";
import { useHttpClient } from "../../hooks/http-hook";
import { useTitle } from "../../hooks/title-hook";

import { conditionalRender } from "../../Utility/RenderUtilities";

import {
  VALIDATOR_DISPLAYNAME,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_PASSWORD,
  VALIDATOR_PASSWORD_COMPARE,
  VALIDATOR_REQUIRE,
} from "../../shared/FormElements/Validators";

const ProfilePage = (props) => {
  const [profileData, setProfileData] = useState({});
  const [modalVisible, , hideModal, deleteRoute, setDeleteRoute] = useModal();
  //for image upload
  const [imageState, imageInputHandler] = useForm({
    avatar: {
      value: null,
      isValid: false,
    },
  });
  //for profile data
  const [profileState, profileInputHandler] = useForm({
    displayName: {
      value: "",
      isValid: false,
    },
    bio: {
      value: "",
      isValid: false,
    },
  });
  //for password updating
  const [passwordState, passwordInputHandler] = useForm({
    oldPassword: {
      value: "",
      isValid: false,
    },
    newPassword: {
      value: "",
      isValid: false,
    },
    passwordConfirm: {
      value: "",
      isValid: false,
    },
  });

  const history = useHistory();
  const username = useParams().username;

  useTitle("Regular Reviews: Your Profile");

  const { sendRequest, responseMessage } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await sendRequest(`/api/profile/${username}`);
        setProfileData(data);
      } catch (err) {
        console.log(err);
        history.push("/");
      }
    };

    getUserInfo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateImageHandler = async (event) => {
    event.preventDefault();

    if (imageState.formValid) {
      try {
        const formData = new FormData();
        formData.append("avatar", imageState.inputs.avatar.value);

        const data = await sendRequest(
          `/api/profile/${username}/updateAvatar`,
          "POST",
          formData
        );
        auth.updateUserData({ avatar: data.avatar });
        setProfileData((prevProfileData) => {
          const newData = {
            ...prevProfileData,
          };

          newData["avatar"] = data.avatar;

          return newData;
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const updateProfileHandler = async (event) => {
    event.preventDefault();

    if (profileState.formValid) {
      console.log(profileState);

      try {
        const data = await sendRequest(
          `/api/profile/${username}/updateInfo`,
          "POST",
          JSON.stringify({
            displayName: profileState.inputs.displayName.value,
            bio: profileState.inputs.bio.value,
          }),
          { "Content-Type": "application/json" }
        );
        auth.updateUserData({ displayName: data.displayName, bio: data.bio });
        setProfileData((prevProfileData) => {
          const newData = {
            ...prevProfileData,
          };

          newData["displayName"] = data.displayName;
          newData["bio"] = data.bio;

          return newData;
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const updatePasswordHandler = async (event) => {
    event.preventDefault();

    if (passwordState.formValid) {
      try {
        await sendRequest(
          `/api/profile/${username}/updatePassword`,
          "POST",
          JSON.stringify({
            oldPassword: passwordState.inputs.oldPassword.value,
            newPassword: passwordState.inputs.newPassword.value,
          }),
          { "Content-Type": "application/json" }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteHandler = async () => {
    hideModal();

    try {
      const data = await sendRequest(deleteRoute, "DELETE");

      if(data.logout){
        auth.logout();
      } else {
        history.push("/");
      }

    } catch (err) {
      console.log(err);
    }
  };

  return conditionalRender(
    <Page heading="Your Profile">
      {conditionalRender(
        <MessageDisplay type={responseMessage.type}>
          {responseMessage.message}
        </MessageDisplay>,
        responseMessage.message !== null
      )}
      <Modal show={modalVisible} hideModal={hideModal}>
        <ModalDeleteContent
          deleteMessage="WARNING - Deleting your account will remove all of your reviews. This cannot be reversed."
          delete={deleteHandler}
          close={hideModal}
        />
      </Modal>

      <ContentWrapper>
        <form onSubmit={updateImageHandler}>
          <ProfileImagePicker
            id="avatar"
            label="Profile Picture"
            image={profileData.avatar}
            onInput={imageInputHandler}
            buttonMessage="Upload"
          />
        </form>
      </ContentWrapper>

      <ContentWrapper>
        <form onSubmit={updateProfileHandler}>
          <ProfileForm
            label="Display Name"
            type="input"
            inputType="text"
            id="displayName"
            placeholder="Display Name"
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_DISPLAYNAME(profileData.displayName),
            ]}
            errorMessage="Only casing of your display name can be changed."
            inputHandler={profileInputHandler}
            initialValue={profileData.displayName}
          />

          <ProfileForm
            label="Personal Bio"
            type="textarea"
            id="bio"
            placeholder="Your Personal Bio"
            initialValue={profileData.bio}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(300)]}
            errorMessage="Your bio has a character limit of 300"
            inputHandler={profileInputHandler}
            disabled={!profileState.formValid}
            buttonMessage="Update"
          />
        </form>
      </ContentWrapper>

      <ContentWrapper>
        <form onSubmit={updatePasswordHandler}>
          <ProfileForm
            label="Change Password"
            type="input"
            inputType="password"
            id="oldPassword"
            placeholder="Old Password"
            validators={[VALIDATOR_REQUIRE()]}
            errorMessage="Please enter your old password"
            inputHandler={passwordInputHandler}
          />
          <ProfileForm
            type="input"
            inputType="password"
            id="newPassword"
            placeholder="New Password"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_PASSWORD()]}
            errorMessage="Password must be 8 characters in length and contain at least one uppercase character and one number"
            inputHandler={passwordInputHandler}
          />
          <ProfileForm
            type="input"
            inputType="password"
            id="passwordConfirm"
            placeholder="Confirm Password"
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_PASSWORD_COMPARE(
                passwordState.inputs.newPassword.value
              ),
            ]}
            errorMessage="Both passwords must match"
            inputHandler={passwordInputHandler}
            disabled={!passwordState.formValid}
            buttonMessage="Change Password"
          />
        </form>
      </ContentWrapper>

      <ContentWrapper>
        <ProfileDelete
          label="Delete Account"
          buttonMessage="Delete Account"
          onClick={() => {
            setDeleteRoute(`/api/profile/${username}/`);
          }}
        />
      </ContentWrapper>
    </Page>,
    !_.isEmpty(profileData)
  );
};

export default ProfilePage;
