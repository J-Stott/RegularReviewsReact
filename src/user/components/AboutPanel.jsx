import React from "react";
import ContentWrapper from "../../shared/components/ContentWrapper";
import FlexContainer from "../../shared/components/FlexContainer";

import classes from "./AboutPanel.module.css";

const AboutPanel = (props) => {
    return(
        <ContentWrapper >
            <FlexContainer row>
                <div className={classes["image-container"]}>
                    <img className={classes["avatar"]}src={props.avatar} alt="avatar"/>
                    <p className="center-text">Reviews: {props.numReviews}</p>
                </div>
                <div className={classes["profile-container"]}>
                    <h3>About {props.name}</h3>
                    <p className={classes["bio"]}>{props.bio}</p>
                </div>
            </FlexContainer>
        </ContentWrapper>
    );
}

export default AboutPanel;