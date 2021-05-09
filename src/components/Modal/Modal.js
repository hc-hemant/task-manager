import React from "react";
import { createPortal } from "react-dom";

import "./Modal.css";
import Button from "../Button/Button";
import { X } from "react-bootstrap-icons";

const overlayRoot = document.getElementById("overlay-root");
const backdropRoot = document.getElementById("backdrop-root");

const BackDrop = () => {
  return <div className="backdrop-container"></div>;
};

const ModalContent = (props) => {
  return (
    <div className="modal-content-container">
      <div className="modal-header">
        <h2>{props.title}</h2>
        <span
          className="modal-content-container__icon"
          onClick={props.onSecondaryButtonClick}
        >
          <X fontSize={24} fontWeight={800} />
        </span>
      </div>
      <div className="modal-body">{props.children}</div>
      <div className="modal-footer">
        <Button label="Cancel" onClick={props.onSecondaryButtonClick}></Button>
        <Button
          label="Add"
          primary
          onClick={props.onPrimaryButtonClick}
        ></Button>
      </div>
    </div>
  );
};

const Modal = (props) => {
  let modalElement;

  if (props.open) {
    modalElement = (
      <>
        {createPortal(<BackDrop></BackDrop>, backdropRoot)}
        {createPortal(<ModalContent {...props}></ModalContent>, overlayRoot)}
      </>
    );
  }
  return <>{modalElement}</>;
};

export default Modal;
