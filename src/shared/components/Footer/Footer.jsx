import React from "react";
import { Link } from "react-router-dom";

import IgdbLogo from "../../../assets/images/igdb.png";

import classes from "./Footer.module.css";

import Container from "../Container";

const Footer = (props) => {
  return (
    <footer className={classes["footer"]}>
      <Container fillHeight>
        <div className={classes["footer-content"]}>
          <div className={classes["copyright"]}>
            © {new Date().getFullYear()} Regular Reviews
          </div>
          <div className={classes["footer-links"]}>
            <Link to="/privacy">privacy</Link> | <Link to="/terms">terms</Link>{" "}
            | <Link to="/cookies">cookies</Link>
          </div>
          <div className={classes["igdb"]}>
            Game Database powered by{" "}
            <a href="https://igdb.com">
              <img src={IgdbLogo} alt="igdb logo" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
