import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

import classes from "./DraftHeader.module.css";

const DraftHeader = (props) => {
  return (
    <div className={classes["wrapper"]}>
      <div className={classes["image"]}>
        <Link to={`/games/${props.gameLink}`}>
          <img
            className={classes["game-art"]}
            src={props.imageUrl}
            alt="Game Art"
          />
        </Link>
      </div>
      <div>
        <h1 className={classes["title"]}>
          {props.link ? (
            <Link to={`/reviews/${props.id}`}>{props.gameName}</Link>
          ) : (
            props.gameName
          )}
        </h1>
        <StarRating rating={props.rating} />
      </div>
    </div>
  );
};

export default DraftHeader;
