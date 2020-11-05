import React from "react";
import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";

import classes from "./Modal.module.css";

import { conditionalRender } from "../../../Utility/RenderUtilities";

const ModalPanel = (props) => {
  const panel = (
    <div className={`${classes["modal"]}`}>
      {props.children}
    </div>
  );

  return ReactDOM.createPortal(panel, document.querySelector("#modal-portal"));
};

const Modal = (props) => {
  return conditionalRender(
    <React.Fragment>
      <Backdrop onClick={props.hideModal} />
      <ModalPanel>
          {props.children}
      </ModalPanel>
    </React.Fragment>,
    props.show
  );
};

export default Modal;
