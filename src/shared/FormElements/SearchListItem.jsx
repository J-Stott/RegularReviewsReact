import React from "react";
import classes from "./SearchListItem.module.css";

const SearchListItem = (props) => {
  return (
    <div
      className={classes["container"]}
      onClick={() => {
        props.onClick(props.id, props.name, props.link);
      }}
    >
      <div>
        <img
          className={classes["search-game-art"]}
          src={props.image}
          alt="game art"
        />
      </div>
      <div>{props.name}</div>
    </div>
  );
};

export default SearchListItem;
