
import React, { useEffect, useRef, useState } from "react";

import NavMenu from "./NavMenu";
import NavLinks from "./NavLinks";
import classes from "./NavToggler.module.css";

//responsible for toggling the nav menu

const NavToggler = (props) => {

  const [menuVisible, setMenuVisible] = useState(false);
  const navMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuVisible &&
        navMenuRef.current &&
        !navMenuRef.current.contains(event.target)
      ) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navMenuRef, menuVisible]);

  const clickedHandler = () => {
    setMenuVisible((prevState) => {
      return !prevState;
    });
  };

  const hideHandler = () => {
    setMenuVisible(false);
  };

  return (
    <div ref={navMenuRef} className={classes["nav-menu-container"]}>
      <img
        onClick={clickedHandler}
        className={classes["navbar-avatar"]}
        src={props.avatar}
        alt="avatar"
      />
      <NavMenu visible={menuVisible} hideHandler={hideHandler}>
        <NavLinks />
      </NavMenu>
    </div>
  );
};

export default NavToggler;
