import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

import classes from "./ReviewHeader.module.css";

const UserHeader = (props) => {
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
        <div className={classes["author-data-wrapper"]}>
          <div>
            <StarRating rating={props.rating} />
            <p>
              Published on{" "}
              {props.created.toLocaleDateString("en-UK", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {props.edited !== null && (
              <p>
                <em>
                  Last edited on{" "}
                  {props.edited.toLocaleDateString("en-UK", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </em>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
