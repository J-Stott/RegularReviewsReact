import React from 'react';

import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = props => {
  return (
    <div className={classes["loading-spinner-container"]}>
      <div className={classes["lds-dual-ring"]}></div>
    </div>
  );
};

export default LoadingSpinner;
