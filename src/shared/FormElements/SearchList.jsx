import React from "react";

import { conditionalRender } from "../../Utility/RenderUtilities";

import classes from "./SearchList.module.css";

const SearchList = (props) => {
  return conditionalRender(
    <div className={classes["search-results-container"]}>{props.children}</div>,
    props.show
  );
};

export default SearchList;
