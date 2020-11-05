import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";

import classes from "./GameInfo.module.css";

const GameInfo = (props) => {
  return (
    <div>
      <div className={classes["average"]}>Reviews: {props.numReviews}</div>
      <div className={classes["average"]}>Gameplay: <FontAwesomeIcon className={classes["star"]} icon={faStar} /> {props.ratingAverages.gameplay}</div>
      <div className={classes["average"]}>Visuals: <FontAwesomeIcon className={classes["star"]} icon={faStar} /> {props.ratingAverages.visuals}</div>
      <div className={classes["average"]}>Audio: <FontAwesomeIcon className={classes["star"]} icon={faStar} /> {props.ratingAverages.audio}</div>
      <div className={classes["average"]}>Story: <FontAwesomeIcon className={classes["star"]} icon={faStar} /> {props.ratingAverages.story}</div>
      <div className={classes["average"]}>Overall: <FontAwesomeIcon className={classes["star"]} icon={faStar} /> {props.ratingAverages.overall}</div>
    </div>
  );
};

export default GameInfo;
