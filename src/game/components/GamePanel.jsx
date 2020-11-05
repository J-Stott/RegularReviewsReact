import React from "react";
import ContentWrapper from "../../shared/components/ContentWrapper";
import FlexContainer from "../../shared/components/FlexContainer";
import GameInfo from "./GameInfo";
import Button from "../../shared/FormElements/Button";

import classes from "./GamePanel.module.css";

const GamePanel = (props) => {
  return (
    <ContentWrapper>
      <FlexContainer row>
        <div className={classes["image-container"]}>
          <img
            className={classes["game-art"]}
            src={props.image}
            alt="game art"
          />
          <GameInfo
            numReviews={props.numReviews}
            ratingAverages={props.ratingAverages}
          />
        </div>
        <div className={classes["profile-container"]}>
          <h3>{props.name}</h3>
          <p className={classes["description"]}>{props.description}</p>
          <div className={classes["button-margin"]}>
            <Button outline link={`/reviews/create/${props.linkName}`}>
              Create review for {props.name}
            </Button>
          </div>
        </div>
      </FlexContainer>
    </ContentWrapper>
  );
};

export default GamePanel;
