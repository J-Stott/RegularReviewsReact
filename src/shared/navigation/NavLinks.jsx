import React, { useContext } from "react";
import { Link } from "react-router-dom";

import {
  faUserPlus,
  faPencilAlt,
  faSignInAlt,
  faSignOutAlt,
  faStickyNote,
  faUser,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AuthContext } from "../../context/AuthContext";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  let links = null;

  if (auth.isLoggedIn) {
    links = (
      <React.Fragment>
        <Link to="/reviews/create">
          <FontAwesomeIcon icon={faPencilAlt} /> Create Review
        </Link>
        <Link to={`/drafts/${auth.userData.displayName}`}>
          <FontAwesomeIcon icon={faStickyNote} /> Drafts
        </Link>
        <Link to={`/users/${auth.userData.displayName}`}>
          <FontAwesomeIcon icon={faUser} /> Profile
        </Link>
        <Link to={`/profile/${auth.userData.displayName}`}>
          <FontAwesomeIcon icon={faUserCog} /> Profile Settings
        </Link>
        <Link to={`/logout`}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </Link>
      </React.Fragment>
    );
  } else {
    links = (
      <React.Fragment>
        <Link to="/login">
          <FontAwesomeIcon icon={faSignInAlt} /> Login
        </Link>
        <Link to="/register">
          <FontAwesomeIcon icon={faUserPlus} /> Sign Up
        </Link>
      </React.Fragment>
    );
  }

  return links;
};

export default NavLinks;
