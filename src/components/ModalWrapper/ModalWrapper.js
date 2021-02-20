import React, { useState } from "react";
import ReactDOM from "react-dom";

const ModalWrapper = ({ children: ModalContent }) => {
  return (
    <React.Fragment>
      {!ModalContent || typeof document === "undefined"
        ? null
        : ReactDOM.createPortal(ModalContent, document.body)}
    </React.Fragment>
  );
};

export default ModalWrapper;
