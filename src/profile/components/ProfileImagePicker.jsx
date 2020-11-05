import React, { useState, useEffect, useRef } from "react";

import classes from "./ProfileImagePicker.module.css";

import Button from "../../shared/FormElements/Button";

import { conditionalRender } from "../../Utility/RenderUtilities";

const ProfileImagePicker = (props) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const {image} = props;

  //creates a previewUrl for the selected image
  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  useEffect(() => {
    clearFileHandler();
  }, [image]);

  const filePickerRef = useRef();

  const pickedHandler = (event) => {
    let pickedFile = null;
    let fileIsValid = false;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      fileIsValid = true;
      setIsValid(fileIsValid);
    } else {
      setIsValid(fileIsValid);
    }

    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const clearFileHandler = () => {
    setFile(null);
    setPreviewUrl(null);
    setIsValid(false);
  };

  return (
    <div className={classes["form-div"]}>
      <div className={classes["label"]}>
        <h5>{props.label}</h5>
        <div>
          <img
            className={classes["profile-picture"]}
            src={file !== null ? previewUrl : image}
            alt="Preview"
          />
          <p>{file !== null ? "Preview" : "Current"}</p>
        </div>
      </div>
      <div className={classes["inputs"]}>
          <input
            style={{ display: "none" }}
            type="file"
            id={props.id}
            accept=".jpg,.png,.jpeg"
            ref={filePickerRef}
            onChange={pickedHandler}
          />
        <div className={classes["picker-buttons"]}>
          <Button type="button" onClick={pickImageHandler}>
            Pick Image
          </Button>
          <Button type="button" onClick={clearFileHandler} disabled={!isValid}>
            Clear File
          </Button>
        </div>
        {conditionalRender(
          <div className={classes["button"]}>
            <Button type="submit" disabled={!isValid}>{props.buttonMessage}</Button>
          </div>,
          !!props.buttonMessage
        )}
      </div>
    </div>
  );
};

export default ProfileImagePicker;
