import React from "react";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import Container from "../components/Container";
import FlexContainer from "../components/FlexContainer";
import SearchBar from "./SearchBar";
import NavToggler from "./NavToggler";

//overall navbar. Will contain logo, game search bar and navigation menu

const Navbar = (props) => {

  return (
    <div className={classes["navbar"]}>
      <Container fillHeight>
        <FlexContainer row align fill>
          <div className={classes["logo"]}>
            <Link to="/">Logo</Link>
          </div>
          <div className={classes["search"]}>
            <SearchBar placeholder="Search for Games" />
          </div>
          <div className={classes["nav"]}>
            <NavToggler avatar={props.avatar} />
          </div>
        </FlexContainer>
      </Container>
    </div>
  );
};

export default Navbar;
